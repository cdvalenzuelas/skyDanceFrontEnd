/* eslint-disable @typescript-eslint/no-unused-vars */
// Libs
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

// Componets
import type { Product, ProductSale, SaleFromDb } from '@state'

const supabase = createClientComponentClient()

interface Summary {
  produc_id: string
  quantity: number
  price: number
  total: number
  profit: number
  total_profit: number
}

export const createProductSale = async (summary: Summary[]): Promise<ProductSale[]> => {
  const sale = summary.map(({ produc_id: productId, quantity }) => ({ produc_id: productId, quantity }))
  const total = summary.reduce((a, b) => a + b.total, 0)
  const profit = summary.reduce((a, b) => a + b.total_profit, 0)
  const summaryIds = summary.map(item => item.produc_id)

  try {
    // Voy a insertar el plan
    const { data, error } = await supabase
      .from('product_sales')
      .insert({ sale, total, profit })
      .select()

    const createdProductSale: ProductSale[] | null = [...data as ProductSale[]]

    // Si hay un error lanzar error
    if (createdProductSale.length === 0 || createdProductSale === null) {
      throw new Error()
    } else if (error !== null) {
      throw new Error()
    }

    const { data: data2, error: error2 } = await supabase
      .from('products')
      .select('*')
      .in('id', summaryIds)

    const productsToUpdate: Product[] | null = [...data2 as Product[]]

    productsToUpdate.forEach(item => {
      const soldQuantity = sale.filter(item2 => item2.produc_id === item.id)[0].quantity

      item.quantity = item.quantity - soldQuantity
    })

    // Si hay un error lanzar error
    if (productsToUpdate.length === 0 || productsToUpdate === null) {
      throw new Error()
    } else if (error2 !== null) {
      throw new Error()
    }

    const promesas = productsToUpdate.map(item =>
      supabase
        .from('products')
        .update({ quantity: item.quantity })
        .eq('id', item.id)
    )

    const resultados = await Promise
      .all(promesas)
      .catch(() => {
        throw new Error()
      })

    return createdProductSale
  } catch {
    return []
  }
}
