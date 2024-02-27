import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// *********************TYPES***************//

interface ProductSummary {
  produc_id: string
  quantity: number
}

export interface ProductSale {
  id: string
  created_at: string
  profit: number
  total: number
  sale: ProductSummary[]
}

export interface ProductSaleState {
  productSales: ProductSale[]
}

interface Actions {
  setProductSales: (productSales: ProductSale[]) => void
}

// *********************STATE***************//

const UserStateApi: StateCreator<ProductSaleState & Actions> = (set, get) => ({
  productSales: [],
  setProductSales: (productSales) => {
    set({ productSales })
  }
})

export const useProductSalesState = create<ProductSaleState & Actions>()(
  devtools(UserStateApi)
)
