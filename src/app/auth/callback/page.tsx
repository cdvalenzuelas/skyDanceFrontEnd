'use client'

// Libs
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Componest | State | types
import { getUserById, createNewUser } from '@api'
import { type User, useUserState } from '@state'
import { updateActivePlanStatus } from '@/api/updateActivePlanStatus'

export default function Page() {
  const setUser = useUserState(state => state.setUser)
  const router = useRouter()
  const supabase = createClientComponentClient()

  // Saber que hacer si se encuentra un usuario o no
  const verifyUser = async (id: string, scheletonUser: Partial<User>): Promise<void> => {
    // VER SI ESTÁ REGISTRADO EN LA PAGINA
    const user = await getUserById(id)

    // Si el usuario existe llevarlo a la pagina de inicio, de lo contrario crear un usuario
    if (user.length > 0) {
      if (user[0].active_plan !== null) {
        // Verify activePalnStatus
        const currentDate = new Date()
        const currentDate2 = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
        const classesWasCompleted = user[0].active_plan.classes !== -1 && (user[0].active_plan.classes === user[0].active_plan.taken_classes)
        const dateWasReached = user[0].active_plan.end_date < currentDate2

        if ((classesWasCompleted || dateWasReached) && user[0].active_plan.active) {
          user[0].active_plan.active = false

          updateActivePlanStatus([user[0].active_plan.id as string])
        }
      }

      setUser(user[0])
      router.replace('/user')
    } else {
      const newUser = await createNewUser(scheletonUser)

      setUser(newUser[0])
      router.replace('/user')
      // Mandarlo a registrar
      // router.push('/signin')
    }
  }

  useEffect(() => {
    (async () => {
      supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === 'SIGNED_IN') {
          const user = session?.user

          const scheletonUser: Partial<User> = {
            auth_id: user?.id,
            name: user?.user_metadata.full_name,
            mail: user?.email as string,
            phone: user?.phone as string,
            role: 'user',
            image: user?.user_metadata.avatar_url,
            referral_code: user?.email?.split('@')[0]
          }

          verifyUser(user?.id as string, scheletonUser)
        }
      })
    })()
  }, [])

  return <main className='h-screen w-screen flex items-center justify-center'>
    cargando....
  </main>
}
