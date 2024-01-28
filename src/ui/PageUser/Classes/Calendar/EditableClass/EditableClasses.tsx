// Libs
import { type FC } from 'react'

// Components |  State
import { useClassesState } from '@state'
import { EditableClass } from '.'

interface Props {
  day: number
  month: number
  year: number
  dayNameStart: number
}

export const EditableClasses: FC<Props> = ({ day, month, year, dayNameStart }) => {
  const classes = useClassesState(state => state.classes)

  return (<>
    {classes.map(danceClass => {
      const date = danceClass.date

      const internalYear = date.getFullYear()
      const internalMoth = date.getMonth()
      const interalDay = date.getDate()

      const match = day === interalDay && month === internalMoth && year === internalYear

      return match
        ? <EditableClass key={danceClass.id} danceClass={danceClass} day={day} month={month} year={year} />
        : null
    })}
  </>)
}
