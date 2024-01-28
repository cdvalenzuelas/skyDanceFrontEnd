import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabase = createClientComponentClient()

interface Input {
  ids: string[]
  table: string
  select: string
}

export const populate = async <T>({ table, select, ids }: Input) => {
  try {
    const { data } = await supabase
      .from(table)
      .select(select)
      .in('id', ids)

    return data as T
  } catch (error) {
    return [] as T
  }
}
