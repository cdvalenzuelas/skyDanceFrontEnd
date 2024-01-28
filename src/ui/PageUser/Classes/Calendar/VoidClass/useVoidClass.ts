// Libs
import { useState, useEffect, type ChangeEvent, type MouseEvent, type Dispatch, type SetStateAction } from 'react'

// Typos
import type { DanceClass, MinimalUser, ScheduleClass } from '@state'
import { usePortalState, useUsersState, useClassesState } from '@state'
import { createClass } from '@api'

interface Props {
  danceClass: ScheduleClass
  year: number
  month: number
  day: number
}

export const useVoidClass = ({ danceClass, year, month, day }: Props) => {
  const [internalDanceClass, setInternalDanceClass] = useState<DanceClass>({
    ...danceClass,
    users: [],
    canceled: false,
    done: false,
    date: new Date(year, month, day)
  })

  return { internalDanceClass, setInternalDanceClass }
}
