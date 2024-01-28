'use client'

// Libs
import { type MouseEvent, useEffect } from 'react'
import { Button } from '@nextui-org/react'

// Components | State | types
import { Header } from '@/ui/Global/Header'
import { type UserStageType, useUsersStage } from '@state'
import { Classes } from '@/ui/PageUser/Classes'
import { Schedule } from '@/ui/PageUser/Schedule'
import { Info } from '@/ui/PageUser/Info'
import { PacksTable } from '@/ui/PageUser/Packs/PacksTable'
import { Sales } from '@/ui/PageUser/Sales'

export interface Props {
  title: string
  content: string
  buttonText: string
}

export default function User() {
  // GESTIONAR EL ESTADO
  const setUserStage = useUsersStage(state => state.setUserStage)
  const userStage = useUsersStage(state => state.userStage)

  // CLICK
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as UserStageType
    e.preventDefault()
    setUserStage(name)
  }

  useEffect(() => {
    return () => {
      setUserStage('info')
    }
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 overflow-auto flex justify-start'>

        <aside className='flex flex-col gap-5 px-5 py-5 items-center bg-primary w-1/5'>
          <Button size='sm' color='secondary' variant={userStage === 'info' ? 'solid' : 'ghost'} onClick={handleClick} name='info'>Perflil</Button>
          <Button size='sm' color='secondary' variant={userStage === 'classes' ? 'solid' : 'ghost'} onClick={handleClick} name='classes'>Clases</Button>
          <Button size='sm' color='secondary' variant={userStage === 'schedule' ? 'solid' : 'ghost'} onClick={handleClick} name='schedule'>Horario</Button>
          <Button size='sm' color='secondary' variant={userStage === 'packs' ? 'solid' : 'ghost'} onClick={handleClick} name='packs'>Packs</Button>
          <Button size='sm' color='secondary' variant={userStage === 'sales' ? 'solid' : 'ghost'} onClick={handleClick} name='sales'>VENTAS</Button>
          {/* <Button size='sm' color='secondary' variant={userStage === 'book' ? 'solid' : 'ghost'} onClick={handleClick} name='book'>Reservar</Button>
          <Button size='sm' color='secondary' variant={userStage === 'papers' ? 'solid' : 'ghost'} onClick={handleClick} name='papers'>Facturas</Button>
          <Button size='sm' color='secondary' variant={userStage === 'renew' ? 'solid' : 'ghost'} onClick={handleClick} name='renew'>Renovar</Button> */}
        </aside>

        <main className='flex-1 overflow-auto flex flex-col gap-5 py-5 px-5 bg-slate-100'>

          {userStage === 'info' && <Info />}
          {userStage === 'classes' && <Classes />}
          {userStage === 'schedule' && <Schedule />}
          {userStage === 'packs' && <PacksTable />}
          {userStage === 'sales' && <Sales />}

          {/* <section className='flex flex-col gap-5' style={{ display: userStage === 'papers' ? '' : 'none' }}>
            <H3>FACTURAS</H3>
          </section>

          <section className='flex flex-col gap-5' style={{ display: userStage === 'book' ? '' : 'none' }}>
            <H3>RESERVAR</H3>
          </section>

          <section className='flex flex-col gap-5' style={{ display: userStage === 'renew' ? '' : 'none' }}>
            <H3>RENOVAR</H3>
          </section> */}

        </main >
      </div>
    </div>
  )
}
