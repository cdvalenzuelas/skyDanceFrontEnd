import { Accordion, AccordionItem, Chip } from '@nextui-org/react'
import { ButtonSale } from '../SaleButton'
import styles from '../styles.module.css'

import { useSaleAccordeon } from './useSaleAccordeon'

export const SaleAccordeon = () => {
  const { currentPeriod, moneyByPeriod, salesByPeriod, users, isOpenModals, handleclick } = useSaleAccordeon()

  return <Accordion defaultExpandedKeys={[currentPeriod]} className={styles.accordion}>
    {Object.keys(salesByPeriod).map(period => (

      <AccordionItem title={period} key={period} subtitle={<Chip color='primary'>$ {moneyByPeriod[period]}</Chip>}
      >

        <div className='flex flex-col gap-3'>
          {salesByPeriod[period].map(sale => {
            const user = users.filter(user => user.id === sale.user_id)[0]
            const saleId = sale.id as string

            return sale.name === 'cortesia'
              ? null
              : <ButtonSale key={sale.id} user={user} sale={sale} value={saleId} handleclick={handleclick} isOpenModals={isOpenModals} />
          })}
        </div>

      </AccordionItem>

    ))}

  </Accordion>
}
