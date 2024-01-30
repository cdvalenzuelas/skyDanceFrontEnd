// Libs
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

// Función para iniciar seción
export const logIn = async () => {
  try {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: process.env.NEXT_PUBLIC_API_URL + '/auth/callback'
      }
    })
  } catch (error) {
    return []
  }
}
