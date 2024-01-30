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
  hoursOfClassesByDay: Record<string, number[]>
  setHoursOfClassesByDay: () => void
}

// ***************************STATE*****************************//

const UserStateApi: StateCreator<AppClasses & Actions> = (set, get) => ({
  hoursOfClassesByDay: {},
  classes: [],
  saveClasses: (classes) => {
    set({ classes }, false)
  },
  addClass: (newClass) => {
    set({ classes: [...get().classes, newClass] })
  },
  setHoursOfClassesByDay: () => {
    let internalHoursOfClassesByDay: Record<string, number[]> = {}

    get().classes.forEach(item => {
      const day = String(item.date.getDate())

      let value: Record<string, number[]>

      if (!Object.keys(internalHoursOfClassesByDay).includes(day)) {
        value = { [day]: [item.hour] }
      } else {
        value = { [day]: [...internalHoursOfClassesByDay[day], item.hour] }
      }

      internalHoursOfClassesByDay = { ...internalHoursOfClassesByDay, ...value }
    })

    set({ hoursOfClassesByDay: internalHoursOfClassesByDay })
  }
})

export const useClassesState = create<AppClasses & Actions>()(
  devtools(UserStateApi)
)
