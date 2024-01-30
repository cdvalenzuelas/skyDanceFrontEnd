// State | Componets
import { VoidDays, TitleDays, DayWithClasses } from './Days'
import { useCalendar } from './useCalendar'
import { moths } from './utils'
import { VoidClasses } from './VoidClass/VoidClasses'
import { EditableClasses } from './EditableClass/EditableClasses'
import styles from './styles.module.css'
import { useUserState } from '@state'

export const Calendar = () => {
  const { day, month, year, daysAtMoth, startDay } = useCalendar()
  const userRole = useUserState(state => state.role)

  return (
    <>
      {moths[month]} / {year}
      <hr />
      <div className={`${styles.container}`}>
        <TitleDays />
        <VoidDays startDay={startDay} />
        {Array.from({ length: daysAtMoth }, (_, i) => (
          <DayWithClasses key={i} day={i + 1} currentDay={day}>
            {(userRole === 'admin' || userRole === 'superAdmin') && <VoidClasses day={i + 1} month={month} year={year} dayNameStart={startDay} />}
            <EditableClasses day={i + 1} month={month} year={year} />
          </DayWithClasses>
        ))}
      </div>
    </>
  )
}
