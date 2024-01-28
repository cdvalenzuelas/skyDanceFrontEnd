// Libs
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Componets
import type { DanceClass, DanceClassFromDB, MinimalUser } from '@state'
import { populate } from '.'

interface DanceClassToCreatePrev extends Omit<DanceClassFromDB, 'id' | 'users' | 'date'> {
  users: string
  date: Date
  done: boolean
}

const supabase = createClientComponentClient()

export const createClass = async (danceClass: DanceClass): Promise<DanceClass[]> => {
  const { id, teacher, users, date, ...rest } = danceClass

  const usersIds = users.map(item => item.id)

  const danceClassToCreate: DanceClassToCreatePrev = {
    ...rest,
    teacher: teacher.id,
    users: `{"${usersIds.join('","')}"}`, // Es necesario hacerlo así para que supabase lo entienda
    date: new Date(date.getFullYear(), date.getMonth(), date.getDate()),
    done: true
  }

  try {
    const { data, error } = await supabase
      .from('classes')
      .insert(danceClassToCreate)
      .select()

    if (data === null) {
      throw new Error()
    }

    const classesFromDB: DanceClassFromDB = data[0] as DanceClassFromDB

    const ids = [classesFromDB.teacher, ...classesFromDB.users]
    const classUsers = await populate<MinimalUser[]>({ table: 'users', select: 'id, name, image, role, status', ids })

    const populateClassesFromDB: DanceClass = {
      ...classesFromDB,
      teacher: classUsers.filter(item => item.id === classesFromDB.teacher)[0],
      users: classUsers.filter(item => classesFromDB.users.includes(item.id)),
      date: new Date(date.getFullYear(), date.getMonth(), date.getDate())
    }

    return [populateClassesFromDB]
  } catch {
    return []
  }
}
