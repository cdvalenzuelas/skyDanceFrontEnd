// Libs
import { type MouseEvent, useState, type Dispatch, type SetStateAction } from 'react'

// Componets
import { usePacksState, useUsersState, type PaymentMode, type Pack, useSalesState, type User, useUserState } from '@state'
import { createSale } from '@api'
import { type nameOptions, createDefaultSale } from '../utils'
import { useUserAndPackChange } from './useUserAndPackChange'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useNewSaleModal = ({ setIsOpen }: Props) => {
  // Hooks
  const packs = usePacksState(state => state.packs)
  const addSale = useSalesState(state => state.addSale)
  const activateUser = useUserState(state => state.activateUser)
  const updateUserPack = useUsersState(state => state.updateUserPack)

  const [user, setUser] = useState<User | null>(null)
  const [pack, setPack] = useState<Pack>(packs[0])
  const [paymentMode, setPaymentMode] = useState<PaymentMode>('chash')

  // Si el usuario ya esta establecido y se le quier dar una cortesía pero ya ha comprado algo antes
  const defaultSale = createDefaultSale(packs[0])

  const { startDateMessage, promotion, internalSale, courtesPackId } = useUserAndPackChange({ user, pack, sale: defaultSale, paymentMode })

  // Functions
  const getUser = (user: User | null): void => {
    setUser(user)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const [sale] = await createSale(internalSale)
    addSale(sale)

    updateUserPack(sale.user_id, sale)
    activateUser(sale)
    setIsOpen(false)
  }

  // Seleccionar items seleccionables
  const handSelect = (e: MouseEvent<HTMLLIElement>, name: nameOptions) => {
    if (name === 'pack') {
      const id = e.currentTarget.dataset.key as string
      const pack = packs.filter(item => item.id === id)[0]

      setPack(pack)
    } else if (name === 'paymentMode') {
      const paymentMode = e.currentTarget.dataset.key as PaymentMode

      setPaymentMode(paymentMode)
    }
  }

  return {
    handles: { handSelect, handleSubmit },
    packs,
    startDateMessage,
    internalSale,
    pack,
    getUser,
    promotion,
    courtesPackId
  }
}
