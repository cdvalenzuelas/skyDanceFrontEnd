// Lib
import { type MouseEvent, useState, useEffect } from 'react'

// Components
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Select, SelectItem, Input, Divider } from '@nextui-org/react'
import { type Sale, usePacksState, useUsersState, type PaymentMode, type Pack, type PackPeriod } from '@state'
import { createSale } from '@api'

const periods: Record<PackPeriod, string[]> = {
  day: ['Día', 'Días'],
  month: ['Mes', 'Meses'],
  week: ['Semana', 'Semanas'],
  year: ['Año', 'Años']
} as const

const duaration = (classes: number, duration: number, period: PackPeriod) => {
  let textClasse = ''
  const textDuration = duration === 1
    ? period === 'week' ? 'Una' : 'Un'
    : String(duration)
  const textPeriod = duration === 1
    ? periods[period][0]
    : periods[period][1]

  if (classes === 0) {
    textClasse = 'Clases Ilimitadas durante ' + textDuration + ' ' + textPeriod
  } else if (classes === 1) {
    textClasse = 'Una Clase'
  } else {
    textClasse = String(classes) + ' Clases durante ' + textDuration + ' ' + textPeriod
  }

  return textClasse
}

type nameOptions = 'pack' | 'paymentMode'

const paymentModes: PaymentMode[] = ['chash', 'daviplata', 'nequi', 'tranfer', 'tranfiya']

export const Sales = () => {
  const [statDateMessage, setStatDateMessage] = useState<string>('')
  const users = useUsersState(state => state.users)

  const packs = usePacksState(state => state.packs)

  const [isOpnen, setIsOpen] = useState<boolean>(false)

  const [pack, setPack] = useState<Pack>(packs[0])
  const [state, setState] = useState<Sale>({
    userId: 'eda7a4cb-9d26-46c4-b466-ba128b378759',
    packId: packs[0].id,
    saleDate: new Date(),
    startDate: new Date(),
    endDate: new Date(),
    classes: packs[0].classes,
    takenClasses: 0,
    missingClasses: packs[0].classes,
    active: true,
    discount: 0,
    discountDescription: '',
    paymentMode: 'chash'
  })

  // Cada vez que se cambie el plan que se cambie la fecha de fin y fecha de inicio por defecto
  useEffect(() => {
    const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
    const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

    // Determinar la fecha de inicio por defecto
    const currentDate = new Date()
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() + 15)

    const dayName = days[startDate.getDay()]
    const day = startDate.getDate()
    const monthName = months[startDate.getMonth()]
    const year = startDate.getFullYear()

    // Determinar la fecha de finalización del plan
    const { duration, period, classes } = pack

    const endDate: Date = new Date(startDate)

    if (period === 'day') {
      //
    } else if (period === 'month') {
      endDate.setMonth(endDate.getMonth() + duration)
    } else if (period === 'week') {
      endDate.setDate(endDate.getDate() + 7 * duration)
    }

    // Cambiar el estado de los componetes
    setStatDateMessage(`${dayName} ${day} de ${monthName} de ${year}`)
    setState({ ...state, endDate, startDate, classes })
  }, [pack])

  const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const sale = await createSale(state)
    setIsOpen(false)
  }

  // Seleccionar items seleccionables
  const handSelect = (e: MouseEvent<HTMLLIElement>, name: nameOptions) => {
    if (name === 'pack') {
      const id = e.currentTarget.dataset.key as string
      const pack = packs.filter(item => item.id === id)[0]

      setState({
        ...state,
        packId: id,
        classes: pack.classes
      })

      setPack(pack)
    } else if (name === 'paymentMode') {
      const paymentMode = e.currentTarget.dataset.key as PaymentMode

      setState({
        ...state,
        paymentMode
      })
    }
  }

  return (<>
    <Button size='sm' color='success' onClick={handleOpen} name='open'>Nueva Venta</Button>

    <Modal placement='center' isOpen={isOpnen} size='lg' backdrop='blur'>
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

          <Divider />

          <span>{`Puedes empezar tus clases hoy, recuerda que tu plan se aciva automáticamente el ${statDateMessage}.`}</span>

        </ModalBody>

        <ModalFooter>
          <Button name='close' size='sm' color='danger' variant='ghost' onClick={handleOpen}>Cerrar</Button>
          <Button size='sm' color='primary' onClick={handleSubmit}>Crear</Button>
        </ModalFooter>

      </ModalContent>
    </Modal>
  </>)
}
