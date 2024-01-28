import { type StateCreator, create } from 'zustand'
import { devtools } from 'zustand/middleware'

// **********************************TYPES************************************ //

export type UserStatus = 'active' | 'inactive'

export type UserRole = 'user' | 'teacher' | 'admin' | 'superAdmin'

export interface User {
  id: string // user.id
  authId: string
  name: string // user.user_metadata.full_name
  mail: string // user.email
  phone: string // user.phone
  status: UserStatus // vienen del server
  activePackage: 'bronce' | 'plata' | 'bronce' | 'platino' | 'parejas' | 'grirlPower' | 'none' // vinen del server
  role: UserRole// viene del server
  dateStart: Date
  dateEnd: Date
  image: string // user_metadata.avatar_url
}

interface Actions {
  logIn: (user: User) => void
  logOut: () => void
}

//  *********************************STATE****************************** //

const voidUser: User = {
  name: '',
  mail: '',
  status: 'inactive',
  activePackage: 'platino',
  dateStart: new Date(),
  dateEnd: new Date(),
  image: '',
  id: '',
  authId: '',
  phone: '',
  role: 'user'
}

const UserStateApi: StateCreator<User & Actions> = (set, get) => ({
  ...voidUser,
  logIn: (user: User) => { set({ ...user }) },
  logOut: () => { set({ ...voidUser }, false) }
})

export const useUserState = create<User & Actions>()(
  devtools(UserStateApi)
)
