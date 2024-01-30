import { H3 } from '@/ui/Global/Titles/H3'
import { useUserState } from '@state'

export const Info = () => {
  // VIENE DEL ESTADO
  const name = useUserState(state => state.name)
  const mail = useUserState(state => state.mail)
  const phone = useUserState(state => state.phone)
  const instagram = useUserState(state => state.instagram_id)
  const activePlan = useUserState(state => state.active_plan)

  return (<section className='flex flex-col gap-5 px-5 py-5'>
    <H3>Información personal</H3>
    <span>Nombre: {name}</span>
    <span>Correo: {mail}</span>
    <span>Celular: {phone}</span>
    <span>Instagram: {instagram}</span>
    <span>Estado: {activePlan?.active === true ? 'Activo' : 'Inactivo'}</span>
    <span>Plan: {activePlan?.name === undefined ? 'Ninguno' : activePlan.name}</span>
    {activePlan !== null && <>
      <span>Clases: {activePlan?.taken_classes} / {activePlan?.classes === -1 ? '∞' : activePlan.classes}</span>
      <span>Fecha de Compa: {activePlan.sale_date.toDateString()}</span>
      <span>Fecha Inicio: {activePlan.start_date.toDateString()}</span>
      <span>Fecha Finalización: {activePlan.end_date.toDateString()}</span>
    </>}
  </section>)
}
