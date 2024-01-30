// Libs
import { type FC, useEffect, useState } from 'react'

// Components |  State
import { type DanceClass, useClassesState } from '@state'
import { EditableClass } from '.'

interface Props {
  day: number
  month: number
  year: number
}

export const EditableClasses: FC<Props> = ({ day, month, year }) => {
  const classes = useClassesState(state => state.classes)
  const [internalClasses, setInternalClasses] = useState<DanceClass[]>([])

  useEffect(() => {
    const internalClasses = classes.filter(({ date }) => {
      const internalYear = date.getFullYear()
      const internalMoth = date.getMonth()
      const interalDay = date.getDate()

      return day === interalDay && month === internalMoth && year === internalYear
    })

    setInternalClasses(internalClasses)
  }, [classes.length, day, month, year])

  return (<>
    {internalClasses.map(danceClass => <EditableClass key={danceClass.id} danceClass={danceClass} day={day} month={month} year={year} />)}
  </>)
}
