// Libs
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Componets
import type { Sale } from '@state'

const supabase = createClientComponentClient()

export const createSale = async (sale: Sale): Promise<Sale[]> => {
  console.log(sale)

  try {
    const { data, error } = await supabase
      .from('sales')
      .insert(sale)
      .select()

    if (error !== null) {
      console.log(error)
    }

    if (data === null) {
      throw new Error()
    }



    return data
  } catch {
    return []
  }
}
