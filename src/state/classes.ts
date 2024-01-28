import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { DanceClass } from '@state'

// *****************************TYPES****************************//
export interface AppClasses {
  classes: DanceClass[]
}

interface Actions {
  saveClasses: (classes: DanceClass[]) => void
  addClass: (newClaa: DanceClass) => void
}

// ***************************STATE*****************************//

const UserStateApi: StateCreator<AppClasses & Actions> = (set, get) => ({
  classes: [],
  saveClasses: (classes) => {
    set({ classes }, false)
  },
  addClass: (newClass) => {
    set({ classes: [...get().classes, newClass] })
  }
})

export const useClassesState = create<AppClasses & Actions>()(
  devtools(UserStateApi)
)
