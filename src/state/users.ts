import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { UserStatus, UserRole } from '@state'

// **********************************TYPES************************************ //

export interface MinimalUser {
  id: string
  image: string
  status: UserStatus
  name: string
  role: UserRole
}

export interface MinimalUsers {
  users: MinimalUser[]
}

interface Actions {
  saveUsers: (users: MinimalUser[]) => void
  getTeachers: () => MinimalUser[]
}

// ************************************STATE******************************* //

const UserStateApi: StateCreator<MinimalUsers & Actions> = (set, get) => ({
  users: [],
  saveUsers: (users: MinimalUser[]) => {
    set({ users }, false)
  },
  getTeachers: () => {
    const teachers = get().users.filter(item => item.role === 'teacher')

    return teachers
  }
})

export const useUsersState = create<MinimalUsers & Actions>()(
  devtools(UserStateApi)
)
