'use client'

// Libs
import { type MouseEvent, useEffect } from 'react'
import { Button } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

// Components | State | types
import { Header } from '@/ui/Global/Header'
import { type UserStageType, useUsersStage, useScheduleState, useUsersState, useClassesState, usePacksState, useUserState, useDateState } from '@state'
import { Classes } from '@/ui/Pages/User/Classes'
import { Schedule } from '@/ui/Pages/User/Schedule'
import { Info } from '@/ui/Pages/User/Info'
import { PacksTable } from '@/ui/Pages/User/Packs/PacksTable'
import { Sales } from '@/ui/Pages/User/Sales'
import { getClasses, getPacks, getSchedule, getUsers } from '@/api'
import { ProfileIcon } from './ProfileIcon'
import { ScheduleIcon } from './ScheduleIcon'
import { ClassIcon } from './ClassIcon'
import { SalesIcon } from './SalesIcon'
import { PacksIcon } from './PacksIcon'
import style from './styles.module.css'

export interface Props {
  title: string
  content: string
  buttonText: string
}

export default function User() {
  // GESTIONAR EL ESTADO
  const setUserStage = useUsersStage(state => state.setUserStage)
  const userStage = useUsersStage(state => state.userStage)
  const saveSchedule = useScheduleState(state => state.saveSchedule)
  const saveUsers = useUsersState(state => state.saveUsers)
  const saveClasses = useClassesState(state => state.saveClasses)
  const savePacks = usePacksState(state => state.setPacks)
  const userRole = useUserState(state => state.role)
  const userId = useUserState(state => state.id)
  const router = useRouter()
  const getDate = useDateState(state => state.getDate)

  // CLICK
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as UserStageType
    setUserStage(name)
  }

  useEffect(() => {
    // Saber si un suario está autenticado

    // Traer los datos del servidor
    (async () => {
      if (userId !== '') {
        // Traer la fecha actual
        const { month, year } = getDate()

        // Traer todos los datos de la base de datos a la vez
        const [schedule, classes, users, packs] = await Promise.all([
          getSchedule(),
          getClasses(year, month),
          getUsers(),
          getPacks()
        ])

        saveSchedule(schedule)
        saveClasses(`${year}-${month}`, classes)
        saveUsers(users)
        savePacks(packs)
      } else {
        router.replace('/')
      }
    })()

    // Cuando se muera el componete dejar el stage en info
    return () => {
      setUserStage('info')
    }
  }, [])

  return (
    <div className='flex flex-col h-screen'>
      <Header />
      <div className='flex-1 overflow-auto flex justify-start'>

        <aside className={`flex flex-col items-center bg-primary xl:w-1/12 lg:w-1/12 md:w-1/6 ${style.aside}`}>
          <Button startContent={<ProfileIcon />} size='sm' radius='none' className='w-full' color='secondary' variant={userStage === 'info' ? 'solid' : 'flat'} onClick={handleClick} name='info'>Perflil</Button>
          <Button startContent={<ClassIcon />} size='sm' radius='none' className='w-full' color='secondary' variant={userStage === 'classes' ? 'solid' : 'flat'} onClick={handleClick} name='classes'>Clases</Button>
          <Button startContent={<ScheduleIcon />} size='sm' radius='none' className='w-full' color='secondary' variant={userStage === 'schedule' ? 'solid' : 'flat'} onClick={handleClick} name='schedule'>Horario</Button>
          <Button startContent={<PacksIcon />} size='sm' radius='none' className='w-full' color='secondary' variant={userStage === 'packs' ? 'solid' : 'flat'} onClick={handleClick} name='packs'>Packs</Button>

          {(userRole === 'admin' || userRole === 'superAdmin') && <Button
            size='sm'
            color='secondary'
            variant={userStage === 'sales' ? 'solid' : 'flat'}
            onClick={handleClick}
            startContent={<SalesIcon />}
            className='w-full'
            radius='none'
            name='sales'>
            VENTAS
          </Button>}

          {/* <Button size='sm' color='secondary' variant={userStage === 'book' ? 'solid' : 'ghost'} onClick={handleClick} name='book'>Reservar</Button>
          <Button size='sm' color='secondary' variant={userStage === 'papers' ? 'solid' : 'ghost'} onClick={handleClick} name='papers'>Facturas</Button>
          <Button size='sm' color='secondary' variant={userStage === 'renew' ? 'solid' : 'ghost'} onClick={handleClick} name='renew'>Renovar</Button> */}
        </aside>

        <main className='flex-1 overflow-auto bg-slate-100'>

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
