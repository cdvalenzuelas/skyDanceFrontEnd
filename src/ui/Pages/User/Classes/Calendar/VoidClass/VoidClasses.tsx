// Libs
import { type FC, useEffect } from 'react'

// Components |  State
import { determinateDay } from '../utils'
import { useClassesState, useScheduleState } from '@state'
import { VoidClass } from '.'

interface Props {
  day: number
  month: number
  year: number
  dayNameStart: number
}

export const VoidClasses: FC<Props> = ({ day, month, year, dayNameStart }) => {
  const schedule = useScheduleState(state => state.schedule)
  const hoursOfClassesByDay = useClassesState(state => state.hoursOfClassesByDay)
  const setHoursOfClassesByDay = useClassesState(state => state.setHoursOfClassesByDay)
  const classes = useClassesState(state => state.classes)

  useEffect(() => {
    setHoursOfClassesByDay()
  }, [])

  useEffect(() => {
    setHoursOfClassesByDay()
  }, [classes.length])

  return (<>
    {schedule.map(danceClass => {
      const interalDay = determinateDay(day, dayNameStart)
      const dayHours = Object.keys(hoursOfClassesByDay).includes(String(day)) ? hoursOfClassesByDay[String(day)] : []

      // SI YA HAY UNA CLASE LLENA NO SE RENDERICE LA DEL HORARIO
      const condition1 = (danceClass.day === interalDay) && !(dayHours.includes(danceClass.hour))

      return condition1
        ? <VoidClass key={danceClass.id} danceClass={danceClass} day={day} month={month} year={year} />
        : null
    })}
  </>)
}
