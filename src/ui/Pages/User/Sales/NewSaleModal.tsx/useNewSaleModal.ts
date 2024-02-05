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

  const defaultSale = createDefaultSale(packs[0])

  const { startDateMessage, promotion, internalSale } = useUserAndPackChange({ user, pack, sale: defaultSale })

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

      internalSale.payment_mode = paymentMode
    }
  }

  console.log(internalSale)

  return {
    handles: { handSelect, handleSubmit },
    packs,
    startDateMessage,
    internalSale,
    pack,
    getUser,
    promotion
  }
}
