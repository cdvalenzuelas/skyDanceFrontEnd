import { Accordion, AccordionItem, Divider } from '@nextui-org/react'
import styles from '../../styles.module.css'

import { useEffect } from 'react'
import { getProducts } from '@/api'
import { useProductsState } from '@/state'

export const ProductsAccordeon = () => {
  const setProducts = useProductsState(state => state.setProducts)
  // const { moneyByPeriod, salesByPeriod, users, isOpenModals, handleclick } = useSaleAccordeon()

  // const currentDate = new Date()
  // const currentDate2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())

  useEffect(() => {
    (async () => {
      const products = await getProducts()

      setProducts(products)
    })()
  }, [])

  return <Accordion defaultExpandedKeys={[]} className={styles.accordion} variant='shadow'>
    {['enero', 'febrero'].map(period => (

      <AccordionItem title={period} key={period}
      >
        <Divider />

        <div className='flex flex-col gap-3 py-3'>
          hola
        </div>

      </AccordionItem>

    ))}

  </Accordion>
}
