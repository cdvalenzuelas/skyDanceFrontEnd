// Components
import { useScheduleState } from '@state'
import styles from './styles.module.css'
import { TitleDays } from './TitleDays'
import { Card, Chip, Link, User } from '@nextui-org/react'

export const Schedule = () => {
  const schedule = useScheduleState(state => state.schedule)

  return (<div className={`${styles.container}`}>
    <TitleDays />

    {Array.from({ length: 7 }, (_, i) => (
      <div key={i} className={`flex flex-col gap-1 ${styles.dayDivider}`}>
        {schedule.map(item => {
          if (item.day === i) {
            return <Card key={item.id} className='px-5 py-5 flex flex-col gap-2'>
              <User
                name={item.teacher.name}
                className='py-2'
                description={(
                  <Link href="https://www.instagram.com/bachataduane/" size="sm" isExternal>
                    @bachataduane
                  </Link>
                )}
                avatarProps={{
                  src: item.teacher.image,
                  size: 'lg'
                }}
              />
              <Chip size='sm' color='primary'>{item.hour}:00 a {item.hour + 1}:00</Chip>
              <div className='flex gap-1'>
                <Chip size='sm' color='danger'>{item.gender}</Chip>
                <Chip size='sm' color='warning'>{item.difficulty}</Chip>
                <Chip size='sm' color='success'>{item.mode}</Chip>
                {item.style !== '' && <Chip color='primary'>{item.style}</Chip>}
              </div>
            </Card>
          } else {
            return null
          }
        })}
      </div>))}
  </div>)
}
