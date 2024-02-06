import { Card, CardBody, CardFooter, CardHeader, Chip, Divider, Textarea, User } from '@nextui-org/react'
import { useUserState, useUsersState } from '@state'
import { getDaysBetweenTwoDates, formardate } from '@/utils/dates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons'
import { UserChip } from '@/ui/Global/UserChip'
import { userColor } from '@/utils/users'

export const Info = () => {
  // VIENE DEL ESTADO
  const userId = useUserState(state => state.id)
  const users = useUsersState(item => item.users)
  const user = users.filter(item2 => item2.id === userId)[0]

  if (user === undefined) {
    return null
  }

  const daysBetweenTwoDates = user.active_plan !== null
    ? getDaysBetweenTwoDates(user.active_plan.end_date, new Date())
    : 0

  return (<section className='flex flex-col gap-5 px-5 py-5 items-center justify-center h-full'>
    <Card style={{ padding: '2rem' }}>

      <CardHeader className='flex justify-between mb-2 gap-5'>
        <User
          name={user.name}
          description={user.instagram_id}
          avatarProps={{
            src: `${user.image}`,
            isBordered: true,
            color: userColor(user)
          }}
        />

        <UserChip user={user} />
      </CardHeader>

      <Divider />

      <CardBody className='flex flex-col gap-2 mb-2'>

        {/* Nombre del último plan comprado */}
        <Chip
          color='success'
          variant='bordered'
          size='lg'
          style={{ margin: '1rem 0' }}>
          Plan: {user.active_plan?.name === undefined ? 'Ninguno' : user.active_plan.name}
        </Chip>

        {/* Si el usuario es nuevo hacerle una promoción */}
        {user.active_plan === null && <Textarea
          isReadOnly
          color='warning'
          type="text"
          label="Promoción"
          size='sm'
          variant='flat'
          value='🌟 ¡Empieza tu viaje de aprendizaje con nosotros! Si eres nuevo, aprovecha ahora: hasta 20% de descuento en tu primer plan. ¡Tu futuro brillante te espera! 🚀'
        />}

        {/* El susurio ya tiene una clase cortesía registrada */}
        {user.active_plan !== null && <>

          {/* SI EL PLAN ES ACTIVO */}
          <div className='flex justify-between w-full gap-5'>

            Clases: {user.active_plan?.taken_classes} / {user.active_plan?.classes === -1 ? '∞' : user.active_plan.classes}

            {user.active_plan?.classes !== -1 &&
              <Chip size='sm'
                color={user.active_plan.taken_classes < user.active_plan.classes
                  ? 'success'
                  : 'danger'}
              >
                {user.active_plan.taken_classes < user.active_plan.classes
                  ? `Te quedan ${user.active_plan.classes - user.active_plan.taken_classes} clases`
                  : 'Acabaste tus Clases'}
              </Chip>
            }

          </div>

          <span>Compa: {formardate(user.active_plan.sale_date)}</span>
          <span>Inicio: {formardate(user.active_plan.start_date)}</span>

          <div className='flex justify-between w-full gap-5'>

            Fin: {formardate(user.active_plan.end_date)}

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
        <span><FontAwesomeIcon icon={faEnvelope} style={{ color: 'var(--blue1)' }} />: {user.mail}</span>
        <span><FontAwesomeIcon icon={faPhone} style={{ color: 'var(--blue1)' }} />: {user.phone}</span>
      </CardFooter>

    </Card>
  </section>)
}
