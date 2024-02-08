// Components
import { useScheduleState } from '@state'
import styles from './styles.module.css'
import { Button, Card, Chip, Divider, Link, User } from '@nextui-org/react'
import { useEffect, useState } from 'react'

const days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']

export const Schedule = () => {
  const schedule = useScheduleState(state => state.schedule)
  const [visibleDay, setVisibleDay] = useState<number[]>([0, 0, 0, 0, 0, 0, 0])

  useEffect(() => {
    const newVisibleDay = [...visibleDay]

    newVisibleDay.forEach((item, i) => {
      newVisibleDay[i] = schedule.filter(item2 => item2.day === i).length
    })

    setVisibleDay(newVisibleDay)
  }, [])

  return (<div className={`${styles.container}`}>
    {Array.from({ length: 7 }, (_, i) => {
      if (visibleDay[i] > 0) {
        return <div key={i} className={styles.day}>

          <Button
            key={days[i]}
            className='w-full'
            variant='flat'
            disabled
            style={{ display: visibleDay[i] === 0 ? 'none' : 'initial' }}
            color="secondary">
            {days[i]}
          </Button>

          <div className={styles.classContainer}>
            {schedule.map(item => {
              if (item.day === i) {
                return <Card key={item.id} className={styles.class} style={{ backgroundColor: `var(--${item.gender}-color)` }}>

                  <User
                    name={item.teacher.name}
                    className='py-2'
                    description={(
                      <Link href={`https://www.instagram.com/${item.teacher.instagram_id}/`} size="sm" isExternal>
                        @{item.teacher.instagram_id}
                      </Link>
                    )}
                    avatarProps={{
                      src: item.teacher.image,
                      size: 'sm'
                    }}
                  />

                  <Divider />

                  <Chip
                    size='sm'
                    color='primary'>
                    {item.hour}:00 a {item.hour + 1}:00
                  </Chip>

                  <div className='flex gap-1'>

                    <Chip size='sm' color='danger'>{item.gender}</Chip>
                    <Chip size='sm' color='warning'>{item.difficulty}</Chip>
                    <Chip size='sm' color='success'>{item.mode}</Chip>
                    {!["''", ''].includes(item.style) && <Chip color='primary' size='sm'>{item.style}</Chip>}

                  </div>

                </Card>
              } else {
                return null
              }
            })}
          </div>

        </div>
      } else {
        return null
      }
    })}
  </div>)
}
