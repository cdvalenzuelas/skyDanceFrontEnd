// Libs
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react'
import type { Dispatch, FC, MouseEvent, SetStateAction } from 'react'
import style from './styles.module.css'

import { SearchProducts } from '@/ui/Global/SearchProducts'

interface Props {
  isOpen: boolean
  handleOpen: (e: MouseEvent<HTMLButtonElement>) => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NewSaleModal: FC<Props> = ({ isOpen, handleOpen, setIsOpen }) => {
  return (<Modal placement='center' isOpen={isOpen} size='lg' backdrop='blur' className={style.form}>
    <ModalContent>

      <ModalHeader>
        Registrar Nueva Venta de Productos
      </ModalHeader>

      <ModalBody>

        <SearchProducts />

      </ModalBody>

      <ModalFooter>
        <Button name='close' size='sm' color='danger' variant='ghost' onClick={handleOpen}>Cerrar</Button>
        <Button size='sm' color='primary' >Crear</Button>
      </ModalFooter>

    </ModalContent>
  </Modal>)
}
