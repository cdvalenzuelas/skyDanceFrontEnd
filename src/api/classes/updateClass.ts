// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { Sale, User } from '@state'

const supabase = createClientComponentClient()

interface Users {
  usersToAdd: User[]
  usersToDelete: User[]
  users: User[]
  classId: string
}

interface Response {
  data: Sale[]
}

export const updateClasses = async ({ usersToAdd, usersToDelete, users, classId }: Users): Promise<Sale[]> => {
  // Ids
  const usersIds = users.map(user => user.id)

  // UsersToAdd
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

  // UsersToAdd
  const usersToDelete2 = usersToDelete.filter(user => user.active_plan !== undefined || user.active_plan !== null).map(user => {
    let active = user.active_plan?.active
    const takenClasses = user.active_plan?.taken_classes as number
    const classes = user.active_plan?.classes as number

    if (classes !== -1 && classes === takenClasses) {
      active = true
    }

    return {
      planId: user.active_plan?.id,
      id: user.id,
      taken_classes: takenClasses - 1,
      active
    }
  })

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

    // Modificar los usuarios eliminados

    const usersToAddPrommise = usersToAdd2.map(user => {
      return supabase
        .from('sales')
        .update({ taken_classes: user.taken_classes, active: user.active })
        .eq('id', user.planId)
        .select()
    })

    const usersToDeletePrommise = usersToDelete2.map(user => {
      return supabase
        .from('sales')
        .update({ taken_classes: user.taken_classes, active: user.active })
        .eq('id', user.planId)
        .select()
    })

    const usersToAddResults = await Promise.all([...usersToAddPrommise, ...usersToDeletePrommise])

    const returnUsers = JSON.parse(JSON.stringify(usersToAddResults)) as Response[]

    const response = returnUsers[0].data

    return response
  } catch {
    return []
  }
}
