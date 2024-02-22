// Libs
import { type MouseEvent, useState, type Dispatch, type SetStateAction, type ChangeEvent } from 'react'

// Componets
import { usePacksState, useUsersState, type PaymentMode, type Pack, type User, useProductsState } from '@state'
import { type nameOptions, createDefaultSale } from '../../utils'
import { useUserAndPackChange } from './useUserAndPackChange'
import { useCreatesale } from '@/apiInternal'

interface Props {
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

export const useNewSaleModal = ({ setIsOpen }: Props) => {
  // Hooks
  const products = useProductsState(state => state.products)

  // Si el usuario ya esta establecido y se le quier dar una cortesía pero ya ha comprado algo antes
  const defaultSale = createDefaultSale(packs[0])

  const { startDateMessage, promotion, internalSale, courtesPackId } = useUserAndPackChange({ user, pack, sale: defaultSale, paymentMode, referralUser })

  const { createSale } = useCreatesale({ internalSale, referralUser })

  // Functions
  const getUser = (user: User | null): void => {
    setUser(user)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    createSale()
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    const internalReferralUser = users.filter(item => item.referral_code === value)

    if (internalReferralUser.length > 0) {
      setReferralUser(internalReferralUser[0])
    } else {
      setReferralUser(null)
    }

    setReferralCode(value)
  }

  return {
    handles: { handSelect, handleSubmit, handleChange },
    packs,
    startDateMessage,
    internalSale,
    pack,
    getUser,
    promotion,
    courtesPackId,
    user,
    referralCode,
    referralUser
  }
}
