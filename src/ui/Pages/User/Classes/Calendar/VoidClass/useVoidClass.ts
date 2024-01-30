// Libs
import { useState, useEffect } from 'react'

// Typos
import type { ScheduleClass, DanceClass } from '@state'

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

  useEffect(() => {
    setInternalDanceClass({
      ...danceClass,
      users: [],
      canceled: false,
      done: false,
      date: new Date(year, month, day)
    })
  }, [day, month, year])

  return { internalDanceClass, setInternalDanceClass }
}
