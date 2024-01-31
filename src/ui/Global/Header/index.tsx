'use client'
// Lib
import { Link as Link2, Button, Avatar } from '@nextui-org/react'
import Link from 'next/link'

// Componets
import { useUserState } from '@state'
import styles from './styles.module.css'

export const Header = () => {
  const mail = useUserState(state => state.mail)
  const avatarImage = useUserState(state => state.image)
  const active = useUserState(state => state.active_plan?.active)

  return (

    <header className="flex flex-wrap items-center justify-between px-5 py-5">
      <Link href="/" color='primary'>
        <img src='/logo.png' alt="logo" width={50} height={50} className={styles.logo} />
      </Link>
      <nav className="flex flex-wrap gap-3">
        {/* <Button href="/classes" as={Link2} radius='sm' color='secondary' size='sm' variant='solid'>Clases</Button>
        <Button href="/teachers" as={Link2} radius='sm' color='secondary' size='sm' variant='solid'>Profesores</Button>
        <Button href="/schedule" as={Link2} radius='sm' color='secondary' size='sm' variant='solid'>Horario</Button>
        <Button href="/events" as={Link2} radius='sm' color='secondary' size='sm' variant='solid'>Eventos</Button> */}
        {mail === '' && <Button href="/login" as={Link2} color='primary' size='sm'>Login</Button>}
        {mail !== '' && <Link href='/user'><Avatar isBordered color={active === true ? 'success' : 'danger'} src={avatarImage} size='sm' /></Link>}
      </nav>
    </header>
  )
}
