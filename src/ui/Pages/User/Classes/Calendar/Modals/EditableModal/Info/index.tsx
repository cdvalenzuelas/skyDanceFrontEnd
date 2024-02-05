// Libs
import { Avatar, AvatarGroup, Chip, User, Link, Image, Card, CardHeader, CardFooter } from '@nextui-org/react'
import { type FC } from 'react'

// Componets
import { type DanceClass } from '@state'
import styles from '../../styles.module.css'

interface Props {
  danceClass: DanceClass
  dayOfMonth: number
  month: number
  year: number
  editable: boolean
}

export const Info: FC<Props> = ({ danceClass, dayOfMonth, month, year, editable }) => {
  console.log(danceClass)

  return (<Card className={styles.info}>
    <CardHeader className="absolute z-10 top-1 flex flex-col items-start px-5">
      <User
        name={danceClass.teacher.name}
        className='py-2'
        description={(
          <Link href="https://www.instagram.com/bachataduane/" size="sm" isExternal>
            @bachataduane
          </Link>
        )}
        avatarProps={{
          src: danceClass.teacher.image,
          size: 'lg'
        }}
      />

      <div className='flex-grow flex flex-col gap-2'>
        <Chip size='sm' color='secondary'>{`${dayOfMonth}/${month + 1}/${year} ${danceClass.hour}:00 a ${danceClass.hour + 1}:00`}</Chip>
        <div className='flex justify-start gap-2'>
          <Chip size='sm' color='danger'>{danceClass.gender}</Chip>
          <Chip size='sm' color='warning'>{danceClass.difficulty}</Chip>
          <Chip size='sm' color='success'>{danceClass.mode}</Chip>
          {danceClass.style !== '' && <Chip size='sm' color='primary'>{danceClass.style}</Chip>}
        </div>
      </div>

    </CardHeader>

    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between px-5">
      <div className='py-2 flex flex-col gap-2'>
        <Chip size='sm' color='secondary'>{danceClass.users.length} estudiantes</Chip>
        <AvatarGroup max={5} className='flex justify-start'>
          {danceClass.users.map(item => <Avatar key={item.id} src={item.image} />)}
        </AvatarGroup>
      </div>
    </CardFooter>

    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      src="/home/salsa.jpg"
    />
  </Card>)
}
