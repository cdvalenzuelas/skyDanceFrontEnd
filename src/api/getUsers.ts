import { type MinimalUser } from '@state'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export const getUsers = async (): Promise<MinimalUser[]> => {
  try {
    const { data } = await supabase
      .from('users')
      .select('id, name, image, role, status')

    if (data === null) {
      throw new Error()
    }

    return [...data]
  } catch (error) {
    return []
  }
}
