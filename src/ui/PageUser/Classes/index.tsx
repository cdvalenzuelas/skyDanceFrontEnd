// Libs
import { useEffect, useState } from 'react'

// Componets
import { getSchedule, getUsers, getClasses } from '@api'
import { useScheduleState, useUsersState, useClassesState } from '@state'
import { H3 } from '../../Global/Titles/H3'
import { Calendar } from './Calendar'

export const Classes = () => {
  const saveSchedule = useScheduleState(state => state.saveSchedule)
  const saveUsers = useUsersState(state => state.saveUsers)
  const saveClasses = useClassesState(state => state.saveClasses)
  const [hoursOfClassesByDay, setHoursOfClassesByDay] = useState<Record<string, number[]>>({})

  useEffect(() => {
    const getData = async () => {
      // Traer el horario
      const schedule = await getSchedule()
      saveSchedule(schedule)

      // Obtener todas las clases de ese mes
      const classes = await getClasses()
      saveClasses(classes)

      // Determinar cuales son las clases vacias que no se deben renderizar pues ya hay clases editables
      let internalHoursOfClassesByDay: Record<string, number[]> = {}

      classes.forEach(item => {
        const day = String(item.date.getDate())

        let value: Record<string, number[]>

        if (!Object.keys(internalHoursOfClassesByDay).includes(day)) {
          value = { [day]: [item.hour] }
        } else {
          value = { [day]: [...internalHoursOfClassesByDay[day], item.hour] }
        }

        internalHoursOfClassesByDay = { ...internalHoursOfClassesByDay, ...value }
      })

      setHoursOfClassesByDay(internalHoursOfClassesByDay)

      // Traer los usuarios, está simulado deberían ser buscados por el admin o super admin
      const users = await getUsers()
      saveUsers(users)
    }

    getData()
  }, [])

  return (<section className='flex flex-col gap-5 sharow rounded mx-auto w-4/5 px-5 py-5 bg-white shadow-lg'>
    <H3>MIS CLASES</H3>
    <Calendar hoursOfClassesByDay={hoursOfClassesByDay} />
  </section>)
}
