// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { User } from '@state'

const supabase = createClientComponentClient()

interface Users {
  usersToAdd: User[]
  usersToDelete: User[]
  users: User[]
  classId: string
}

export const updateClasses = async ({ usersToAdd, usersToDelete, users, classId }: Users): Promise<void> => {
  // Ids
  // const usersToAddIds = usersToAdd.map(user => user.id)
  // const usersToDeleteIds = usersToDelete.map(user => user.id)
  const usersIds = users.map(user => user.id)

  // ActivePlans
  const usersToAdd2 = usersToAdd.filter(user => user.active_plan !== undefined || user.active_plan !== null).map(user => {
    let active = user.active_plan?.active
    const takenClasses = user.active_plan?.taken_classes as number
    const classes = user.active_plan?.classes as number

    if (classes !== -1 && classes - takenClasses === 1) {
      active = false
    }

    return {
      planId: user.active_plan?.id,
      id: user.id,
      taken_classes: takenClasses + 1,
      active
    }
  })

  console.log(usersToAdd2)

  try {
    // Actualizar la clase
    const { data, error } = await supabase
      .from('classes')
      .update({ users: usersIds })
      .eq('id', classId)
      .select()

    // Si no viene data o hay un error lanzar error
    if (data === null || data.length === 0) {
      throw new Error()
    } else if (error !== null) {
      throw new Error()
    }

    console.log('super error')

    // Modificar los usuarios eliminados

    const usersToAddPrommise = usersToAdd2.map(user => {
      return supabase
        .from('sales')
        .update({ taken_classes: user.taken_classes, active: user.active })
        .eq('id', user.planId)
        .select()
    })

    const usersToAddResults = await Promise.all(usersToAddPrommise)

    console.log(usersToAddResults)

    /*
    const { data, error } = await supabase
      .from('classes')
      .select('id, gender, mode, style, hour, teacher, users, date, difficulty, canceled, done, price')
      .gte('date', `${year}-${month + 1}-01`) // Mayor o igual que el 1 de enero de 2024
      .lt('date', `${nextYear}-${nextMonth}-01`)

    */
    console.log('se actualizaron los usuarios')
  } catch {
    console.log('error')
  }
}

/* [
  "08e77db5-e070-4631-b2e0-c406439f5fc3",
  "ea4fc1bb-4ba7-4afb-a3e0-a68e7c59c628",
  "84bb54cc-f457-4e2e-b7a0-114c4c4310ea",
  "b84279e7-590f-433a-8f74-82413198223b",
  "04ec8c2d-7d26-4c35-bceb-596411e8a249"
] */
