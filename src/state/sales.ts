import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// *********************TYPES***************//
export type PaymentMode = 'chash' | 'nequi' | 'daviplata' | 'tranfer' | 'tranfiya'

export interface Sale {
  id?: string
  userId: string
  packId: string
  saleDate: Date
  startDate: Date
  endDate: Date
  classes: number
  takenClasses: number
  missingClasses: number
  active: boolean
  discount: number
  discountDescription: string
  paymentMode: PaymentMode
}

export interface SaleFromDb extends Omit<Sale, 'saleDate' | 'startDate' | 'endDate'> {
  saleDate: Date
  startDate: Date
  endDate: Date
}

export interface SalesState {
  sales: Sale[]
}

interface Actions {
  setSales: (sales: Sale[]) => void
  addSale: (sale: Sale) => void
}

// *********************STATE***************//

const UserStateApi: StateCreator<SalesState & Actions> = (set, get) => ({
  sales: [],
  setSales: (sales) => {
    set({ sales })
  },
  addSale: (sale) => {
    set({ sales: [...get().sales, sale] })
  }
})

export const useSalesState = create<SalesState & Actions>()(
  devtools(UserStateApi)
)
