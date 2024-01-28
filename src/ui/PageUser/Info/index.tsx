import { H3 } from '@/ui/Global/Titles/H3'
import { useUserState } from '@state'

export const Info = () => {
  // VIENE DEL ESTADO
  const name = useUserState(state => state.name)
  const mail = useUserState(state => state.mail)
  const status = useUserState(state => state.status)
  const pack = useUserState(state => state.activePackage)
  const dateStart = useUserState(state => state.dateStart)
  const dateEnd = useUserState(state => state.dateEnd)

  return (<section className='flex flex-col gap-5 px-5 py-5'>
    <H3>Información personal</H3>
    <span>Nombre: {name}</span>
    <span>correo: {mail}</span>
    <span>Estado: {status}</span>
    <span>Plan: {pack}</span>
    <span>Clases: 8/15</span>
    <span>Fecha Inicio Plan: {dateStart.toDateString()}</span>
    <span>Fecha Fin Plan: {dateEnd.toDateString()}</span>
  </section>)
}
