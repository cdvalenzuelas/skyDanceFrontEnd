import { Avatar, AvatarGroup, Button, Card, CardFooter, CardHeader, Chip, Link, Popover, PopoverContent, PopoverTrigger, User, Image } from '@nextui-org/react'
import styles from '../../styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import { type Dispatch, type FC, type MouseEvent, type SetStateAction } from 'react'
import { type DanceClass } from '@/state'
import { useUserState } from '@/state'
import { getDaysBetweenTwoDates } from '@/utils/dates'

interface VirtualUser extends DanceClass {
  order: number
  image: string
  name: string
}

interface Props {
  danceClass: DanceClass
  dayOfMonth: number
  month: number
  year: number
  editable: boolean
  setToUpdate: Dispatch<SetStateAction<boolean>> | undefined
  virtualUser: VirtualUser[]
}

export const NotToUpdate: FC<Props> = ({ danceClass, dayOfMonth, month, year, editable, setToUpdate, virtualUser }) => {
  const role = useUserState(state => state.role)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setToUpdate !== undefined && setToUpdate(true)
  }

  const daysAgo = getDaysBetweenTwoDates(new Date(), danceClass.date)

  return <Card className={styles.info}>
    <CardHeader className="absolute z-10 top-1 flex flex-row justify-between px-5">

      <div>

        <User
          name={danceClass.teacher.name}
          className='py-2'
          style={{ color: '#fff' }}
          description={(
            <Link href="https://www.instagram.com/bachataduane/" size="sm" isExternal>
              @bachataduane
            </Link>
          )}
          avatarProps={{
            src: danceClass.teacher.image,
            size: 'md',
            isBordered: true,
            color: 'secondary'
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

      </div>

      {!editable && (role === 'admin' || role === 'superAdmin') && daysAgo <= 2 && <Button
        startContent={<FontAwesomeIcon icon={faPen} />}
        isIconOnly
        variant='solid'
        color='warning'
        size='lg'
        style={{ color: '#fff' }}
        onClick={handleClick}
      />}

    </CardHeader>

    <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between px-5">
      <div className='py-2 flex flex-col gap-2'>

        <Chip
          size='sm'
          color='secondary'>
          {danceClass.users.length} estudiantes
        </Chip>

        <AvatarGroup
          color='primary'
          isGrid
          size='sm'
          max={40}
          className='flex justify-start flex-wrap w-full'>
          {virtualUser.map(item => <Popover key={item.id} color='success' backdrop='blur'>
            <PopoverTrigger>
              <Avatar
                key={item.id}
                src={item.image}
                color='success'
                isBordered />
            </PopoverTrigger>
            <PopoverContent>
              {item.name}
            </PopoverContent>
          </Popover>)}
        </AvatarGroup>
      </div>
    </CardFooter>

    <Image
      removeWrapper
      alt="Card background"
      className="z-0 w-full h-full object-cover"
      src={`teachers/${danceClass.teacher.instagram_id}.jpg`}
    />
  </Card>
}
