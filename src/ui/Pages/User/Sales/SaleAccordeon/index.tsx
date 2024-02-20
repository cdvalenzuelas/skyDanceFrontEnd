import { Accordion, AccordionItem, Chip } from '@nextui-org/react'
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

  return <Accordion defaultExpandedKeys={[]} className={styles.accordion}>
    {Object.keys(salesByPeriod).map(period => (

      <AccordionItem title={period} key={period} subtitle={<Chip color='primary'>$ {formatCurency(moneyByPeriod[period])}</Chip>}
      >

        <div className='flex flex-col gap-3'>
          {salesByPeriod[period].map(sale => {
            const user = users.filter(user => user.id === sale.user_id)[0]
            const saleId = sale.id as string
            const status = sale.name === 'cortesia'
              ? 'cortesia'
              : sale.active ? 'vigente' : 'vencido'

            return filters.includes(status) && (selectedUserId === null || selectedUserId === sale.user_id)
              ? <ButtonSale key={sale.id} user={user} sale={sale} value={saleId} handleclick={handleclick} isOpenModals={isOpenModals} />
              : null
          })}
        </div>

      </AccordionItem>

    ))}

  </Accordion>
}
