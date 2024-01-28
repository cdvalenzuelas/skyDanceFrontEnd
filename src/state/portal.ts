import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// ******************TYPES********************
export type ShowPortal = boolean

export interface Portal {
  showPortal: ShowPortal
}

interface Actions {
  open: () => void
  close: () => void
}

// ************************STATE***********************

const UserStateApi: StateCreator<Portal & Actions> = (set, get) => ({
  showPortal: false,
  open: () => {
    set({ showPortal: true }, false)
  },

  // Hacer Logout
  close: () => {
    set({ showPortal: false }, false)
  }
})

export const usePortalState = create<Portal & Actions>()(
  devtools(UserStateApi)
)
