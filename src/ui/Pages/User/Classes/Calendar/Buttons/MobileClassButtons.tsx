// Libs
import { type FC, type MouseEvent } from 'react'

// Components |  State
import { type ScheduleClass, type DanceClass, type UserRole } from '@state'
import styles from './styles.module.css'

interface Props {
  dayOfMonth: number
  scheduleByDay: ScheduleClass[]
  classesByDay: DanceClass[]
  handleClick: (e: MouseEvent<HTMLButtonElement>, day: number) => void
  userRole: UserRole
}

export const MobileClassButtons: FC<Props> = ({ dayOfMonth, scheduleByDay, handleClick, classesByDay, userRole }) => {
  const therAreSomeClass = scheduleByDay.length > 0 || classesByDay.length > 0
  const isAdmin = userRole === 'admin' || userRole === 'superAdmin'

  if (isAdmin && therAreSomeClass) {
    return <><div
      className={styles.clickableDayCenter}
      style={{ backgroundColor: scheduleByDay.length > 0 ? 'var(--warning)' : 'var(--success)' }}
    >
      {''}
    </div>
      <button className={styles.clickableDay} name='mobile' onClick={e => { handleClick(e, dayOfMonth) }} />
    </>
  }

  if (!isAdmin && classesByDay.length > 0) {
    return <><div
      className={styles.clickableDayCenter}
      style={{ backgroundColor: 'var(--success)' }}
    >
      {''}
    </div>
      <button className={styles.clickableDay} name='mobile' onClick={e => { handleClick(e, dayOfMonth) }} />
    </>
  }

  return null
}
