'use client'

// Libs
import { useEffect } from 'react'
import { createClientComponentClient, type User } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

// Componest | State | types
import { getUserById, createNewUser } from '@api'
import { type User as AppUser, useUserState } from '@state'

export default function Page() {
  const supabase = createClientComponentClient()
  const logIn = useUserState(state => state.logIn)
  const router = useRouter()

  const verifyUser = async (id: string, user: Partial<AppUser>) => {
    // VER SI ESTÁ REGISTRADO EN LA PAGINA
    const data = await getUserById(id)

    // SI NO SE ENCUENTRA UN REGISTRO CREAR UNO
    if (data === null) {
      const data2 = await createNewUser(user)
    } else {
      console.log('SÍ EXISTE EL USUARIO')
    }
  }

  useEffect(() => {
    // Escuchar cambios en el estado de autenticación
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        const user = session?.user as User
        // GUARDAR EL USUARIO

        logIn({
          id: user.id,
          authId: user.id,
          name: user.user_metadata.full_name,
          mail: user.email as string,
          phone: user.phone as string,
          status: 'inactive',
          activePackage: 'bronce',
          role: 'user',
          dateStart: new Date(),
          dateEnd: new Date(),
          image: user.user_metadata.avatar_url
        })

        verifyUser(user.id, {
          authId: user.id,
          name: user.user_metadata.full_name,
          mail: user.email as string,
          phone: user.phone as string,
          status: 'inactive',
          role: 'user',
          image: user.user_metadata.avatar_url
        })

        router.push('/')
      }
    })
  }, [])

  return <main className='h-screen w-screen flex items-center justify-center'>
    cargando....
  </main>
}
