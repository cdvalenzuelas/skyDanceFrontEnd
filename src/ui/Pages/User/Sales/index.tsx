// Lib
import { type MouseEvent, useState } from 'react'
import { Button } from '@nextui-org/react'

// Components
import { NewSaleModal } from './NewSaleModal.tsx'
import { SalesTable } from './SalesTable'

export const Sales = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  }

  return (<>
    <SalesTable />
    <Button size='sm' color='success' onClick={handleOpen} name='open'>Nueva Venta</Button>
    <NewSaleModal isOpen={isOpen} handleOpen={handleOpen} setIsOpen={setIsOpen} />
  </>)
}
