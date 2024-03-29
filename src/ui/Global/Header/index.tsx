'use client'

// Lib
import { type MouseEvent } from 'react'
import { Link as Link2, Button, Avatar, Badge } from '@nextui-org/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

// Componets
import { useUserState, useUsersStage, useUsersState, type UserStageType } from '@state'
import styles from './styles.module.css'
import { ProfileIcon } from '@/app/user/ProfileIcon'
import { ClassIcon } from '@/app/user/ClassIcon'
import { PacksIcon } from '@/app/user/PacksIcon'
import { ScheduleIcon } from '@/app/user/ScheduleIcon'
import { SalesIcon } from '@/app/user/SalesIcon'
import { userColor } from '@/utils/users'

export const Header = () => {
  const userId = useUserState(state => state.id)
  const users = useUsersState(item => item.users)
  const setUserStage = useUsersStage(state => state.setUserStage)
  const userStage = useUsersStage(state => state.userStage)
  const pathName = usePathname()

  const user = users.filter(item2 => item2.id === userId)[0]

  if (user === undefined) {
    return null
  }

  const { role, mail, image } = user

  // CLICK
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as UserStageType
    setUserStage(name)
  }

  return (

    <header className={`flex flex-col gap-2 ${styles.header}`}>
      <nav className="flex flex-wrap gap-3 items-center justify-between w-full">

        <Link href="/" color='primary' className={pathName === '/user' ? 'mobileHide' : ''}>
          <img src='/logo.png' alt="logo" className={styles.logo} />
        </Link>

        <Button
          startContent={<ProfileIcon color='#94a3b8' />}
          size='md'
          radius='none'
          color='secondary'
          variant='light'
          name='home'
          isIconOnly
          as={Link}
          href='/'
          className={pathName !== '/user' ? 'mobileHide' : ''}
        />

        <Button
          startContent={<ClassIcon color={userStage === 'classes' ? '#009cd3' : '#94a3b8'} />}
          size='md'
          radius='none'
          color='secondary'
          variant='light'
          onClick={handleClick}
          name='classes'
          isIconOnly
          style={{ borderBottom: userStage === 'classes' ? '2px solid #009cd3' : 'none' }}
          className={pathName !== '/user' ? 'mobileHide' : ''}
        />

        <Button
          startContent={<ScheduleIcon color={userStage === 'schedule' ? '#009cd3' : '#94a3b8'} />}
          size='md'
          radius='none'
          color='secondary'
          variant='light'
          onClick={handleClick}
          name='schedule'
          isIconOnly
          style={{ borderBottom: userStage === 'schedule' ? '2px solid #009cd3' : 'none' }}
          className={pathName !== '/user' ? 'mobileHide' : ''}
        />

        <Badge
          content='sale'
          color='danger'
          size='sm'
        >
          <Button
            startContent={<PacksIcon color={userStage === 'packs' ? '#009cd3' : '#94a3b8'} />}
            size='md'
            radius='none'
            color='secondary'
            variant='light'
            onClick={handleClick}
            name='packs'
            isIconOnly
            style={{ borderBottom: userStage === 'packs' ? '2px solid #009cd3' : 'none' }}
            className={pathName !== '/user' ? 'mobileHide' : ''}
          />
        </Badge>

        {(role === 'admin' || role === 'superAdmin') && <Button
          size='md'
          color='secondary'
          variant='light'
          onClick={handleClick}
          startContent={<SalesIcon color={userStage === 'sales' ? '#009cd3' : '#94a3b8'} />}
          radius='none'
          name='sales'
          isIconOnly
          style={{ borderBottom: userStage === 'sales' ? '2px solid #009cd3' : 'none' }}
          className={pathName !== '/user' ? 'mobileHide' : ''}
        />}

        {mail === '' && <Button href="/login" as={Link2} color='primary' size='sm'>Login</Button>}

        {mail !== '' && pathName !== '/user' &&
          <Link href='/user'>
            <Avatar
              isBordered
              color={userColor(user)}
              src={image} size='sm' />
          </Link>
        }

        {mail !== '' && pathName === '/user' &&
          <Button
            isIconOnly
            size='md'
            color='secondary'
            variant='light'
            name='info'
            className='h-12 w-12 flex flex-col items-center justify-center'
            radius='none'
            onClick={handleClick}
            style={{ borderBottom: userStage === 'info' ? '2px solid #009cd3' : 'none' }}
            startContent={<Avatar
              isBordered
              color={userColor(user)}
              src={image} size='sm' />}
          />
        }
      </nav>
    </header>
  )
}
