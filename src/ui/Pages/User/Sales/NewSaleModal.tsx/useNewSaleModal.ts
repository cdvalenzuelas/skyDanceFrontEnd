// Libs
import { type MouseEvent, useState, useEffect, type ChangeEvent, type Dispatch, type SetStateAction } from 'react'

// Componets
import { type Sale, usePacksState, useUsersState, type PaymentMode, type Pack, useSalesState } from '@state'
import { createSale } from '@api'
import { days, months, type nameOptions, paymentModes, duaration } from '../utils'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useNewSaleModal = ({ setIsOpen }: Props) => {
  const addSale = useSalesState(state => state.addSale)
  const packs = usePacksState(state => state.packs)
  const [startDateMessage, setStatDateMessage] = useState<string>('')
  const users = useUsersState(state => state.users)
  const activateUser = useUsersState(state => state.activateUser)
  const [pack, setPack] = useState<Pack>(packs[0])
  const [state, setState] = useState<Sale>({
    user_id: 'eda7a4cb-9d26-46c4-b466-ba128b378759',
    pack_id: packs[0].id,
    sale_date: new Date(),
    start_date: new Date(),
    end_date: new Date(),
    classes: packs[0].classes,
    taken_classes: 0,
    active: true,
    discount: 0,
    discount_description: '',
    payment_mode: 'chash',
    price: packs[0].price,
    total_price: packs[0].price,
    name: packs[0].name
  })

  // Cada vez que se cambie el plan que se cambie la fecha de fin y fecha de inicio por defecto
  useEffect(() => {
    // Determinar la fecha de inicio por defecto
    const currentDate = new Date()
    const startDate = new Date(currentDate)
    startDate.setDate(currentDate.getDate() + 15)

    const dayName = days[startDate.getDay()]
    const day = startDate.getDate()
    const monthName = months[startDate.getMonth()]
    const year = startDate.getFullYear()

    // Determinar la fecha de finalización del plan
    const { duration, period, classes, price, name } = pack

    const endDate: Date = new Date(startDate)

    if (period === 'day') {
      //
    } else if (period === 'month') {
      endDate.setMonth(endDate.getMonth() + duration)
      endDate.setDate(endDate.getDate() - 1)
    } else if (period === 'week') {
      endDate.setDate(endDate.getDate() + 7 * duration)
    }

    // Cambiar el estado de los componetes
    setStatDateMessage(`${dayName} ${day} de ${monthName} de ${year}`)
    setState({ ...state, end_date: endDate, start_date: startDate, classes, price, name })
  }, [pack])

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const [sale] = await createSale(state)
    addSale(sale)
    activateUser(sale.user_id)
    setState({ ...state, discount: 0, discount_description: '' })
    setIsOpen(false)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as 'discount' | 'discountDescription'

    if (name === 'discount') {
      const discount = Number(e.currentTarget.value)
      setState({ ...state, discount, total_price: pack.price - discount })
    } else if (name === 'discountDescription') {
      const discountDescription = e.currentTarget.value
      setState({ ...state, discount_description: discountDescription })
    }
  }

  // Seleccionar items seleccionables
  const handSelect = (e: MouseEvent<HTMLLIElement>, name: nameOptions) => {
    if (name === 'pack') {
      const id = e.currentTarget.dataset.key as string
      const pack = packs.filter(item => item.id === id)[0]

      setState({
        ...state,
        pack_id: id,
        classes: pack.classes
      })

      setPack(pack)
    } else if (name === 'paymentMode') {
      const paymentMode = e.currentTarget.dataset.key as PaymentMode

      setState({
        ...state,
        payment_mode: paymentMode
      })
    }
  }

  return { handSelect, handleChange, handleSubmit, startDateMessage, users, state, packs, paymentModes, duaration, pack }
}
