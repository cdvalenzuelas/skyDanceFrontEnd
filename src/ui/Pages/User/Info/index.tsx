import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Textarea, User } from '@nextui-org/react'
import { useUserState } from '@state'
import { getDaysBetweenTwoDates, formardate } from '@/utils/dates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'

export const Info = () => {
  // VIENE DEL ESTADO
  const name = useUserState(state => state.name)
  const mail = useUserState(state => state.mail)
  const phone = useUserState(state => state.phone)
  const instagram = useUserState(state => state.instagram_id)
  const activePlan = useUserState(state => state.active_plan)
  const image = useUserState(state => state.image)

  const daysBetweenTwoDates = activePlan !== null
    ? getDaysBetweenTwoDates(activePlan.end_date, new Date())
    : 0

  return (<section className='flex flex-col gap-5 px-5 py-5 items-center justify-center h-full'>
    <Card style={{ padding: '2rem' }}>

      <CardHeader className='flex justify-between mb-2 gap-5'>
        <User
          name={name}
          description={instagram}
          avatarProps={{
            src: `${image}`,
            isBordered: true,
            color: activePlan === null
              ? 'warning'
              : activePlan.active ? 'success' : 'danger'
          }}
        />

        <Chip color={activePlan === null
          ? 'warning'
          : activePlan.active ? 'success' : 'danger'}
        >
          {activePlan?.active === true ? 'Activo' : 'Inactivo'}
        </Chip>
      </CardHeader>

      <Divider />

      <CardBody className='flex flex-col gap-2 mb-2'>

        {/* Nombre del último plan comprado */}
        <Chip
          color='success'
          variant='bordered'
          size='lg'
          style={{ margin: '1rem 0' }}>
          Plan: {activePlan?.name === undefined ? 'Ninguno' : activePlan.name}
        </Chip>

        {/* Si el usuario es nuevo hacerle una promoción */}
        {activePlan === null && <Textarea
          isReadOnly
          color='warning'
          type="text"
          label="Promoción"
          size='sm'
          variant='flat'
          value='🌟 ¡Empieza tu viaje de aprendizaje con nosotros! Si eres nuevo, aprovecha ahora: hasta 20% de descuento en tu primer plan. ¡Tu futuro brillante te espera! 🚀'
        />}

        {/* El susurio ya tiene una clase cortesía registrada */}
        {activePlan !== null && <>

          {/* SI EL PLAN ES ACTIVO */}
          <div className='flex justify-between w-full gap-5'>

            Clases: {activePlan?.taken_classes} / {activePlan?.classes === -1 ? '∞' : activePlan.classes}

            {activePlan.classes !== -1 &&
              <Chip size='sm'
                color={activePlan.taken_classes < activePlan.classes
                  ? 'success'
                  : 'danger'}
              >
                {activePlan.taken_classes < activePlan.classes
                  ? `Te quedan ${activePlan.classes - activePlan.taken_classes} clases`
                  : 'Acabaste tus Clases'}
              </Chip>
            }

          </div>

          <span>Compa: {formardate(activePlan.sale_date)}</span>
          <span>Inicio: {formardate(activePlan.start_date)}</span>

          <div className='flex justify-between w-full gap-5'>

            Fin: {formardate(activePlan.end_date)}

            <Chip size='sm'
              color={daysBetweenTwoDates === 0
                ? 'warning'
                : daysBetweenTwoDates < 0 ? 'danger' : 'success'}
            >
              {daysBetweenTwoDates === 0
                ? 'Tu plan se vence hoy'
                : daysBetweenTwoDates > 0 ? `Te quedan ${daysBetweenTwoDates} días` : `Tu plan se vención hace ${daysBetweenTwoDates} días`}
            </Chip>
          </div>

        </>}
      </CardBody>

      <Divider />

      <CardFooter className='flex flex-col gap-2 items-start'>
        <span><FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--blue1)' }} />: {mail}</span>
        <span><FontAwesomeIcon icon={faPhone} style={{ color: 'var(--blue1)' }} />: {phone}</span>
      </CardFooter>

    </Card>
  </section>)
}
