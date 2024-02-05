'use client'

// Lib
import { Link as Link2, Button } from '@nextui-org/react'

import { Header } from '@/ui/Global/Header'
import { H1 } from '@/ui/Global/Titles/H1'
import { useUserState } from '@state'
import { WhatsappIcon } from './WhatsappLogo'

import styles from './styles.module.css'

export const Hero = () => {
  const mail = useUserState(state => state.mail)

  return (
    <div className={`flex flex-col shadow gap-3 ${styles.hero}`}>
      <Header />
      <div className={`flex flex-col items-center w-full h-full justify-between ${styles.container}`}>
        <H1>Sky Dance</H1>
        <h2>Convierte cada paso en arte</h2>
        <p className="text-center">En SKY DANCE, Bogotá cobra vida con Salsa, Bachata, Reggaetón y más. 🎶 Únete a nosotros para clases vibrantes, eventos únicos y una comunidad que adora bailar. 🌟</p>
        <div className='flex gap-5 relative z-10' >
          <Button startContent={<WhatsappIcon />} href="https://wa.link/g96ox3" isExternal as={Link2} color='primary' size='lg' style={{ backgroundColor: '#25D366' }} className={styles.button}>Contáctanos</Button>
          {mail === '' && <Button className={styles.button} href="/login" as={Link2} color='primary' size='lg'>Empezar</Button>}
        </div>
      </div>
    </div>
  )
}
