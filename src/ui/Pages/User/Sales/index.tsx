// Lib
import { type MouseEvent, useState, useEffect } from 'react'
import { Accordion, AccordionItem, Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, User } from '@nextui-org/react'
import styles from './styles.module.css'
import { getSalesFromDB } from '@/api/getSalesFromDB'
import { useSalesState, useUsersState, type Sale } from '@/state'

// Components
import { NewSaleModal } from './NewSaleModal.tsx'
import { createDateFromString } from '@/api'
import { months } from './utils'
import { userColor } from '@/utils/users'
import { formardate, getDaysBetweenTwoDates } from '@/utils/dates'
// import { SalesTable } from './SalesTable'

type MyRecord = Record<string, Sale[]>

export const Sales = () => {
  // const sales = useSalesState(state => state.sales)
  const users = useUsersState(state => state.users)
  const setSales = useSalesState(state => state.setSales)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [salesByPeriod, setSalesByPeriod] = useState<MyRecord>({})
  const [moneyByPeriod, setMoneyByPeriod] = useState<Record<string, number>>({})

  const currentDate = new Date()
  const currentPeriod = `${months[currentDate.getMonth()]} de ${currentDate.getFullYear()}`

  useEffect(() => {
    (async () => {
      const salesFromDB = await getSalesFromDB()
      const newSales: Sale[] = []
      const newSalesByPeriod = JSON.parse(JSON.stringify(salesByPeriod)) as MyRecord
      const newMoneyByPeriod = JSON.parse(JSON.stringify(salesByPeriod)) as Record<string, number>

      salesFromDB.forEach(item => {
        const newItem = {
          ...item,
          start_date: createDateFromString(item.start_date),
          end_date: createDateFromString(item.end_date),
          sale_date: createDateFromString(item.sale_date)
        }

        const period = `${months[newItem.sale_date.getMonth()]} de ${newItem.sale_date.getFullYear()}`

        if (period in newSalesByPeriod) {
          newSalesByPeriod[period] = [...newSalesByPeriod[period], newItem]
          newMoneyByPeriod[period] = newMoneyByPeriod[period] + newItem.price
        } else {
          newSalesByPeriod[period] = [newItem]
          newMoneyByPeriod[period] = newItem.price
        }

        newSales.push(newItem)
      })

      setMoneyByPeriod(newMoneyByPeriod)
      setSalesByPeriod(newSalesByPeriod)
      setSales(newSales)
    })()
  }, [])

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  }

  return (<>
    <Accordion defaultExpandedKeys={[currentPeriod]}>
      {Object.keys(salesByPeriod).map(period => {
        return <AccordionItem
          title={period}
          key={period}
          subtitle={<Chip color='primary'>$ {moneyByPeriod[period]}</Chip>}
        >
          <div className='flex flex-col gap-3'>
            {salesByPeriod[period].map(sale => {
              const user = users.filter(user => user.id === sale.user_id)[0]

              const daysBetweenTwoDates = user.active_plan !== null
                ? getDaysBetweenTwoDates(user.active_plan.end_date, new Date())
                : 0

              if (sale.name === 'cortesia') {
                return null
              } else {
                return <Card key={sale.id} className={styles.card}>

                  <CardHeader className='flex items-center justify-between'>

                    <User
                      name={user.name}
                      description={user.instagram_id}
                      avatarProps={{
                        src: user.image,
                        size: 'md',
                        isBordered: true,
                        color: userColor(user)
                      }}
                    />

                    <div className='flex gap-2'>
                      <Chip color='warning' size='sm'>{sale.name}</Chip>
                      <Chip color={sale.active ? 'success' : 'danger'} size='sm'>{sale.active ? 'vigente' : 'vencido'}</Chip>
                    </div>

                  </CardHeader>

                  <Divider />

                  <CardBody className='flex flex-col gap-2 w-full'>

                    {user.active_plan !== null && <>

                      <div className='flex items-center justify-between w-full'>
                        Clases: {sale.taken_classes} / {sale.classes === -1 ? '∞' : sale.classes}

                        {sale.classes !== -1 &&
                          <Chip
                            size='sm'
                            variant='flat'
                            color={sale.taken_classes < sale.classes
                              ? 'success'
                              : 'danger'}
                          >
                            {sale.taken_classes < sale.classes
                              ? `Quedan ${sale.classes - sale.taken_classes} clases`
                              : 'Se acabaron las clases'}
                          </Chip>
                        }
                      </div>

                      <span>Compa: {formardate(sale.sale_date)}</span>
                      <span>Inicio: {formardate(sale.start_date)}</span>

                      <div className='flex justify-between w-full gap-5'>

                        Fin: {formardate(sale.end_date)}

                        <Chip size='sm'
                          variant='flat'
                          color={daysBetweenTwoDates === 0
                            ? 'warning'
                            : daysBetweenTwoDates < 0 ? 'danger' : 'success'}
                        >
                          {daysBetweenTwoDates === 0
                            ? 'Se vence hoy'
                            : daysBetweenTwoDates > 0 ? `Quedan ${daysBetweenTwoDates} días` : `Tu plan se vención hace ${daysBetweenTwoDates} días`}
                        </Chip>
                      </div>

                    </>}

                  </CardBody>

                  <Divider />

                  <CardFooter className='flex items-center justify-between'>
                    <Chip variant='flat' color='danger' size='sm'>Precio: ${sale.price}</Chip>
                    <Chip variant='flat' color='warning' size='sm'>Descuento: ${sale.discount}</Chip>
                    <Chip variant='flat' color='success' size='sm'>Precio final: ${sale.total_price}</Chip>
                  </CardFooter>

                </Card>
              }
            })}
          </div>
        </AccordionItem>
      })}
    </Accordion>

    <Button
      size='sm'
      color='success'
      className={styles.newSale}
      variant='shadow'
      onClick={handleOpen}
      name='open'>
      Nueva Venta
    </Button>

    {isOpen && <NewSaleModal
      isOpen={true}
      handleOpen={handleOpen}
      setIsOpen={setIsOpen}
    />}
  </>)
}
