// State | Componets
import { VoidDays, TitleDays, DayWithClasses } from './Days'
import { useCalendar } from './useCalendar'
import { moths } from './utils'
import { VoidClasses } from './VoidClass/VoidClasses'
import { EditableClasses } from './EditableClass/EditableClasses'
import styles from './styles.module.css'

interface Props {
  hoursOfClassesByDay: Record<string, number[]>
}

export const Calendar = ({ hoursOfClassesByDay }: Props) => {
  const { day, month, year, daysAtMoth, startDay } = useCalendar()

  return (
    <>
      {moths[month]} / {year}
      <hr />
      <div className={`${styles.container}`}>
        <TitleDays />
        <VoidDays startDay={startDay} />
        {Array.from({ length: daysAtMoth }, (_, i) => (
          <DayWithClasses key={i} day={i + 1} currentDay={day}>
            <VoidClasses day={i + 1} month={month} year={year} dayNameStart={startDay} hoursOfClassesByDay={hoursOfClassesByDay} />
            <EditableClasses day={i + 1} month={month} year={year} dayNameStart={startDay} />
          </DayWithClasses>
        ))}
      </div>
    </>
  )
}
