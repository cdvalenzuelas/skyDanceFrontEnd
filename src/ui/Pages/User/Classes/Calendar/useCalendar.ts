import { useState, useEffect } from 'react'
import { useDateState, type AppDate } from '@state'

export const useCalendar = () => {
  const getDate = useDateState(state => state.getDate)
  const [state, setState] = useState<AppDate>({ day: 1, month: 1, year: 1, startDay: 1, daysAtMoth: 1 })

  useEffect(() => {
    // Saber en que mes y año estamos
    const data = getDate(true)

    setState(data)
  }, [])

  return { ...state }
}
