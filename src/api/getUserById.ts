import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

export const getUserById = async (id: string) => {
  try {
    const { data } = await supabase
      .from('users')
      .select('id')
      .eq('id', id)
      .single()

    return data
  } catch (error) {
    return []
  }
}
