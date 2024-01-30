// Componets

import { H3 } from '@/ui/Global/Titles/H3'
import { Calendar } from './Calendar'

export const Classes = () => {
  return (<section className='flex flex-col gap-5 sharow rounded mx-auto w-4/5 px-5 py-5 bg-white shadow-lg'>
    <H3>MIS CLASES</H3>
    <Calendar />
  </section>)
}
