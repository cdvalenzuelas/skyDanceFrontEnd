// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { ScheduleClass, ScheduleClassFromDB, MinimalUser } from '@state'
import { populate } from '@api'

const supabase = createClientComponentClient()

export const getSchedule = async (): Promise<ScheduleClass[]> => {
  try {
    const { data, error } = await supabase
      .from('schedule')
      .select('*')
      .order('hour', { ascending: true })

    // SI HAY UN ERROR O VIENE VACÍO
    if ((error !== null && error.code !== 'PGRST116') || data === null) {
      throw new Error()
    }

    const scheduleFromDB: ScheduleClassFromDB[] = [...data]

    // Poblar el horario
    const teachersIds = scheduleFromDB.map(item => item.teacher)

    const teachers = await populate<MinimalUser[]>({ table: 'users', ids: teachersIds, select: 'id, name, image, role, status' })

    const schedule: ScheduleClass[] = scheduleFromDB.map(item => {
      const teacherId = item.teacher
      const teacher = teachers.filter(item2 => item2.id === teacherId)[0]

      return { ...item, teacher }
    })

    return schedule
  } catch {
    return []
  }
}
