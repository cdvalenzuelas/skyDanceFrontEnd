import { type PackPeriod, type PaymentMode } from '@state'

export type nameOptions = 'pack' | 'paymentMode'

export const paymentModes: PaymentMode[] = ['chash', 'daviplata', 'nequi', 'tranfer', 'tranfiya']
export const days = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado']
export const months = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']

const periods: Record<PackPeriod, string[]> = {
  day: ['Día', 'Días'],
  month: ['Mes', 'Meses'],
  week: ['Semana', 'Semanas'],
  year: ['Año', 'Años']
} as const

export const duaration = (classes: number, duration: number, period: PackPeriod) => {
  let textClasse = ''
  const textDuration = duration === 1
    ? period === 'week' ? 'Una' : 'Un'
    : String(duration)
  const textPeriod = duration === 1
    ? periods[period][0]
    : periods[period][1]

  if (classes === 0) {
    textClasse = 'Clases Ilimitadas durante ' + textDuration + ' ' + textPeriod
  } else if (classes === 1) {
    textClasse = 'Una Clase'
  } else {
    textClasse = String(classes) + ' Clases durante ' + textDuration + ' ' + textPeriod
  }

  return textClasse
}
