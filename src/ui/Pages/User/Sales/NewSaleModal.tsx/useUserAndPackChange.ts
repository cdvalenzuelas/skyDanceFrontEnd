import type { User, Sale, Pack } from '@state'
import { endDateOfPack } from '../utils'

interface Props {
  user: User | null
  sale: Sale
  pack: Pack
}

export const useUserAndPackChange = ({ user, sale, pack }: Props) => {
  // DEFINIR TODAS LAS CONSTANTES
  let internalSale = JSON.parse(JSON.stringify(sale)) as Sale
  const { duration, period, classes, price, name, id } = pack
  const [startDateMessage, endDate, currentDay] = endDateOfPack(period, duration)
  const istPromotionsDays = currentDay <= 5 || (currentDay >= 15 && currentDay <= 20)
  let promotion = ''
  let userId = ''
  let discountPercentage = 0
  let discountDescription = ''

  // Cambia el pack
  internalSale = {
    ...internalSale,
    pack_id: id,
    end_date: endDate,
    classes,
    price,
    name,
    total_price: price
  }

  // Si elimina el usuario
  if (user === null) {
    promotion = ''
  } else {
    userId = user.id
    // Si es una cortesía
    if (user.active_plan === null) {
      promotion = 'Eres nuevo por aquí, así que te damos un 20% de descuento en tu primera compra (aplica para todos los planes).'
      discountPercentage = 0.2
      discountDescription = 'new user'
    } else {
      // Si su plan está vencido pero hay día de promoció
      if (!user.active_plan.active && istPromotionsDays) {
        promotion = 'Si renuevas el día de hoy optienes un 10% de descuento (aplica para todos los planes).'
        discountPercentage = 0.1
        discountDescription = 'biweekly renewa'
      }
    }
  }

  internalSale = {
    ...internalSale,
    user_id: userId,
    discount: price * discountPercentage,
    total_price: price * (1 - discountPercentage),
    discount_description: discountDescription
  }

  if (pack.period === 'day' || pack.period === 'week') {
    internalSale = {
      ...internalSale,
      discount: 0,
      total_price: price,
      discount_description: ''
    }
  }

  return {
    startDateMessage,
    promotion,
    internalSale
  }
}