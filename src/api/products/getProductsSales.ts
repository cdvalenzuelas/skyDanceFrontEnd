// Lib
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Types and Componets
import type { ProductSale } from '@state'

const supabase = createClientComponentClient()

export const getProductSales = async (): Promise<ProductSale[]> => {
  try {
    // Hacer la query
    const { data, error } = await supabase
      .from('product_sales')
      .select('*')

    // Si no viene data o hay unerror lazar error
    if (data === null || data.length === 0) {
      throw new Error()
    } else if (error !== null) {
      throw new Error()
    }

    return data as ProductSale[]
  } catch {
    return []
  }
}
