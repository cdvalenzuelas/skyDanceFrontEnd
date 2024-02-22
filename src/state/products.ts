import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// *********************TYPES***************//

export interface Product {
  id: string
  created_at: Date
  name: string
  purchase_price: number
  selling_price: number
  quantity: number
  profit: number
  image: string
}

export interface ProductState {
  products: Product[]
}

interface Actions {
  setProducts: (products: Product[]) => void
}

// *********************STATE***************//

const UserStateApi: StateCreator<ProductState & Actions> = (set, get) => ({
  products: [],
  setProducts: (products) => {
    set({ products })
  }
})

export const useProductsState = create<ProductState & Actions>()(
  devtools(UserStateApi)
)
