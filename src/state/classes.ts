import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { DanceClass, User } from '@state'

// *****************************TYPES****************************//
export interface AppClasses {
  classesStore: Record<string, DanceClass[]>
}

interface Actions {
  saveClasses: (yearMonth: string, classes: DanceClass[]) => void
  addClass: (yearMonth: string, newClass: DanceClass) => void
  hoursOfClassesByDay: Record<string, number[]>
  setHoursOfClassesByDay: (yearMonth: string) => void
  updateClass: (date: Date, classId: string, users: User[]) => void
}

// ***************************STATE*****************************//

const UserStateApi: StateCreator<AppClasses & Actions> = (set, get) => ({
  hoursOfClassesByDay: {},
  classesStore: {},
  saveClasses: (yearMonth, classes) => {
    const classesStore = get().classesStore
    classesStore[yearMonth] = classes

    set({ classesStore })
  },
  addClass: (yearMonth, newClass) => {
    const classesStore = get().classesStore
    classesStore[yearMonth] = [...classesStore[yearMonth], newClass]

    set({ classesStore })
  },
  updateClass: (date: Date, classId: string, users: User[]) => {
    const dateYear = `${date.getFullYear()}-${date.getMonth()}`
    const classesStore = get().classesStore

    const filtered = classesStore[dateYear].filter(item => item.id === classId)[0]
    const notFiltered = classesStore[dateYear].filter(item => item.id !== classId)

    const newUsers = users.map(user => {
      const internalUser = {
        ...user,
        active_plan: user.active_plan
      }

      return internalUser as unknown as User
    })

    filtered.users = newUsers

    classesStore[dateYear] = [filtered, ...notFiltered]

    set({ classesStore })
  },
  setHoursOfClassesByDay: (yearMonth) => {
    let internalHoursOfClassesByDay: Record<string, number[]> = {}

    get().classesStore[yearMonth].forEach(item => {
      const date = new Date(item.date)
      const day = String(date.getDate())

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
