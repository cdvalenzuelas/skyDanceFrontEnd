// Libs
import { type Dispatch, type FC, type SetStateAction } from 'react'

// Componets
import { type User, useUserState, type DanceClass } from '@state'
import { NotToUpdate } from './NotToUpdate'
import { ToUpdate } from './ToUpdate'

interface VirtualUser extends DanceClass {
  order: number
  image: string
  name: string
}

interface Props {
  danceClass: DanceClass
  dayOfMonth: number
  month: number
  year: number
  editable: boolean
  toUpdate?: boolean
  setToUpdate?: Dispatch<SetStateAction<boolean>>
  oldUsers?: User[]
  oldUsersIds?: string[]
  getSelectedUsers?: (users: User[]) => void
}

export const Info: FC<Props> = ({ danceClass, dayOfMonth, month, year, editable, toUpdate, setToUpdate, oldUsers, oldUsersIds, getSelectedUsers }) => {
  const userId = useUserState(state => state.id)
  const virtualUser = danceClass.users.map(item => {
    if (item.id === userId) {
      return { ...item, order: 0 }
    }

    if (item.role === 'user' && item.active_plan === null) {
      return { ...item, order: 1 }
    }

    if (item.active_plan !== null) {
      if (item.role === 'user' && !item.active_plan.active) {
        return { ...item, order: 2 }
      }

      if (item.role === 'user' && item.active_plan.active) {
        return { ...item, order: 3 }
      }
    }

    return { ...item, order: 4 }
  })

  virtualUser.sort((a, b) => a.order - b.order)

  const virtualUser2 = JSON.parse(JSON.stringify(virtualUser)) as VirtualUser[]

  if (toUpdate === false && toUpdate !== undefined) {
    return <NotToUpdate
      danceClass={danceClass}
      dayOfMonth={dayOfMonth}
      month={month}
      year={year}
      editable={editable}
      setToUpdate={setToUpdate}
      virtualUser={virtualUser2}
    />
  } else {
    return <ToUpdate
      danceClass={danceClass}
      oldUsers={oldUsers}
      getSelectedUsers={getSelectedUsers}
    />
  }
}
