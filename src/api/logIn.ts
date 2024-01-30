// Libs
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

// Función para iniciar seción
export const logIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NODE_ENV === 'production'
          ? process.env.NEXT_PUBLIC_API_URL + '/auth/callback'
          : 'http://localhost:3000/auth/callback'
      }
    })
  } catch (error) {
    return []
  }
}
