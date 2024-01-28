import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { User } from '@state'

const supabase = createClientComponentClient()

export const createNewUser = async (user: Partial<User>) => {
  try {
    const { data } = await supabase
      .from('users')
      .insert(user)

    return data
  } catch {
    return []
  }
}
