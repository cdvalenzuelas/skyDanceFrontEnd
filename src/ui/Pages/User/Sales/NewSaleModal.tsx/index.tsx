// Libs
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Input, Divider } from '@nextui-org/react'
import type { Dispatch, FC, MouseEvent, SetStateAction } from 'react'

// Components
import { useNewSaleModal } from './useNewSaleModal'

interface Props {
  isOpen: boolean
  handleOpen: (e: MouseEvent<HTMLButtonElement>) => void
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const NewSaleModal: FC<Props> = ({ isOpen, handleOpen, setIsOpen }) => {
  const { handSelect, handleChange, handleSubmit, startDateMessage, state, packs, paymentModes, duaration, pack } = useNewSaleModal({ setIsOpen })

  return (<Modal placement='center' isOpen={isOpen} size='lg' backdrop='blur'>
    <ModalContent>

      <ModalHeader>
        Registrar Nueva Venta
      </ModalHeader>

      <ModalBody>

        {packs.length > 0 && <Select
          isRequired
          label='Plan'
          items={packs}
          placeholder='Seleccione el Plan'
          size='sm'
          defaultSelectedKeys={[packs[0].id]}
        >
          {packs.map(pack => <SelectItem key={pack.id} onClick={e => { handSelect(e, 'pack') }}>{pack.name}</SelectItem>)}
        </Select>}

        <Select
          isRequired
          label='Método de Pago'
          items={paymentModes}
          placeholder='Seleccione el Método de Pago'
          size='sm'
          defaultSelectedKeys={['chash']}
        >
          {paymentModes.map(item => <SelectItem key={item} onClick={e => { handSelect(e, 'paymentMode') }}>{item}</SelectItem>)}
        </Select>

        <Input
          isReadOnly
          isDisabled
          value={duaration(pack.classes, pack.duration, pack.period)}
          type="text"
          label="Clases / Duración"
          size='sm'
        />

        <Input
          name='discount'
          value={String(state.discount)}
          type="number"
          label="Descuento"
          placeholder='Indique el monto del descuento'
          size='sm'
          onChange={handleChange}
        />

        <Input
          name='discountDescription'
          value={String(state.discount_description)}
          type="text"
          label="Descripción del descuento"
          placeholder='Indique la descripción del descuento'
          size='sm'
          onChange={handleChange}
        />

        <Divider />

        <span>{`Puedes empezar tus clases hoy, recuerda que tu plan se aciva automáticamente el ${startDateMessage}.`}</span>

      </ModalBody>

      <ModalFooter>
        <Button name='close' size='sm' color='danger' variant='ghost' onClick={handleOpen}>Cerrar</Button>
        <Button size='sm' color='primary' onClick={handleSubmit}>Crear</Button>
      </ModalFooter>

    </ModalContent>
  </Modal>)
}
