import { Accordion, AccordionItem, Chip, Divider } from '@nextui-org/react'
import { ButtonSale } from '../SaleButton'
import styles from '../styles.module.css'

import { useSaleAccordeon } from './useSaleAccordeon'
import { type FC } from 'react'
import { formatCurency } from '@/utils/currency'

interface Props {
  filters: string[]
  selectedUserId: string | null
}

export const SaleAccordeon: FC<Props> = ({ filters, selectedUserId }) => {
  const { moneyByPeriod, salesByPeriod, users, isOpenModals, handleclick } = useSaleAccordeon()

  const currentDate = new Date()
  const currentDate2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

  return <Accordion defaultExpandedKeys={[]} className={styles.accordion} variant='shadow'>
    {Object.keys(salesByPeriod).map(period => (

      <AccordionItem title={period} key={period} subtitle={<Chip color='primary'>$ {formatCurency(moneyByPeriod[period])}</Chip>}
      >
        <Divider />

        <div className='flex flex-col gap-3 py-3'>
          {salesByPeriod[period].map(sale => {
            const user = users.filter(user => user.id === sale.user_id)[0]
            const saleId = sale.id as string

            // Verify activePalnStatus
            const classesWasCompleted = sale.classes !== -1 && (sale.classes === sale.taken_classes)
            const dateWasReached = sale.end_date < currentDate2
            const status = sale.name === 'cortesia'
              ? 'cortesia'
              : dateWasReached || classesWasCompleted ? 'vencido' : 'vigente'

            return filters.includes(status) && (selectedUserId === null || selectedUserId === sale.user_id)
              ? <ButtonSale
                key={sale.id}
                user={user}
                sale={sale}
                value={saleId}
                handleclick={handleclick}
                isOpenModals={isOpenModals}
                status={status}
              />
              : null
          })}
        </div>

      </AccordionItem>

    ))}

  </Accordion>
}
