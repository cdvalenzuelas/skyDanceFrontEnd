// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { Pack } from '@state'

const supabase = createClientComponentClient()

export const getPacks = async (): Promise<Pack[]> => {
  try {
    const { data, error } = await supabase
      .from('packs')
      .select('*')

    // SI HAY UN ERROR O VIENE VACÍO
    if ((error !== null && error.code !== 'PGRST116') || data === null) {
      throw new Error()
    }

    const packs: Pack[] = [...data]

    return packs
  } catch {
    return []
  }
}
