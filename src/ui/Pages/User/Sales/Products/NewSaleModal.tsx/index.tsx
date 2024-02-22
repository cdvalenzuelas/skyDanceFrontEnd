// Libs
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import { useState, type Dispatch, type FC, type MouseEvent, type SetStateAction } from 'react'
import style from './styles.module.css'

import { SearchProducts } from '@/ui/Global/SearchProducts'
import { createProductSale } from '@/api'

interface Props {
  isOpen: boolean
  handleOpen: (e: MouseEvent<HTMLButtonElement>) => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

interface Summary {
  produc_id: string
  quantity: number
  price: number
  total: number
  profit: number
  total_profit: number
}

export const NewSaleModal: FC<Props> = ({ isOpen, handleOpen, setIsOpen }) => {
  const [summary, setSummary] = useState<Summary[]>([])

  const getSummary = (summary: Summary[]) => {
    setSummary(summary)
  }

  // Manejar el agregar y eliminar usuarios
  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const productSale = createProductSale(summary)
    setIsOpen(false)
  }

  return (<Modal placement='center' isOpen={isOpen} size='lg' backdrop='blur' className={style.form}>
    <ModalContent>

      <ModalHeader>
        Registrar Nueva Venta de Productos
      </ModalHeader>

      <ModalBody>

        <SearchProducts getSummary={getSummary} />

      </ModalBody>

      <ModalFooter>
        <Button name='close' size='sm' color='danger' variant='ghost' onClick={handleOpen}>Cerrar</Button>
        <Button size='sm' color='primary' onClick={handleSubmit}>Crear</Button>
      </ModalFooter>

    </ModalContent>
  </Modal>)
}
