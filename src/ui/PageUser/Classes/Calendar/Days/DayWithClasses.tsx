// Libs
import React, { type FC } from 'react'
import { Chip } from '@nextui-org/react'

// Componets
import styles from './styles.module.css'

interface Props {
  day: number
  currentDay: number
  children: React.ReactNode
}

export const DayWithClasses: FC<Props> = ({ currentDay, day, children }) => {
  return <div className={`px-1 py-1 ${styles.day}`}>
    <Chip
      size='sm'
      radius='full'
      color={day === currentDay ? 'danger' : 'default'}>
      {day}
    </Chip>
    <div className='flex flex-col gap-1 mt-1'>
      {children}
    </div>
  </div>
}
