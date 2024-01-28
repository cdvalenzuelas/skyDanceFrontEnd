// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { MinimalUser, DanceClass, DanceClassFromDB } from '@state'
import { populate } from '@api'

const supabase = createClientComponentClient()

export const getClasses = async (): Promise<DanceClass[]> => {
  try {
    const { data, error } = await supabase
      .from('classes')
      .select('id, gender, mode, style, hour, teacher, users, date, difficulty')

    // SI HAY UN ERROR O VIENE VACÍO
    if ((error !== null && error.code !== 'PGRST116') || data === null) {
      throw new Error()
    }

    const classesFromDB = [...data] as DanceClassFromDB[]

    // Poblar las clases
    const teachersIds = classesFromDB.map(item => item.teacher)
    const usersIds = classesFromDB.map(item => item.users).flat()

    const idsSet = new Set([...teachersIds, ...usersIds])
    const ids = [...idsSet]

    const users = await populate<MinimalUser[]>({ table: 'users', ids, select: 'id, name, image, role, status' })

    const classes: DanceClass[] = classesFromDB.map(item => {
      // Poblar el profesor
      const teacher = users.filter(item2 => item2.id === item.teacher)[0]

      // Poblar los usuarios
      const internalUsers = item.users.map(userId => {
        return users.filter(item3 => item3.id === userId)[0]
      })

      // Extraer la fecha
      const [year, month, day] = item.date.split('-').map(item3 => parseInt(item3))

      return {
        ...item,
        teacher,
        users: internalUsers,
        date: new Date(year, month - 1, day)
      }
    })

    return classes
  } catch {
    return []
  }
}
