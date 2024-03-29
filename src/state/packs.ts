import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// *********************TYPES***************//

export type PackPeriod = 'day' | 'week' | 'month' | 'year'

export interface Pack {
  id: string
  name: string
  price: number
  classes: number
  duration: number
  period: PackPeriod
}

export interface PackState {
  packs: Pack[]
}

interface Actions {
  setPacks: (packs: Pack[]) => void
}

// *********************STATE***************//

const UserStateApi: StateCreator<PackState & Actions> = (set, get) => ({
  packs: [],
  setPacks: (packs) => {
    set({ packs })
  }
})

export const usePacksState = create<PackState & Actions>()(
  devtools(UserStateApi)
)
