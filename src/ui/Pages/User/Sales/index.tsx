// Lib
import { type MouseEvent, useState } from 'react'
import { Button } from '@nextui-org/react'
import styles from './styles.module.css'

// Components
import { NewSaleModal } from './NewSaleModal.tsx'
import { SaleAccordeon } from './SaleAccordeon'

export const Sales = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  // const sales = useSalesState(state => state.sales)
  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  }

  return (<>

    <SaleAccordeon />

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
