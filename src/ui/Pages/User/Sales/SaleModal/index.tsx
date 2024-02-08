import type { User as AppUser, Sale } from '@/state'
import { formardate, getDaysBetweenTwoDates } from '@/utils/dates'
import { userColor } from '@/utils/users'
import { User, Chip, Divider, Modal, ModalHeader, ModalContent, ModalFooter, ModalBody, Button } from '@nextui-org/react'
import type { FC, MouseEvent } from 'react'
import styles from '../styles.module.css'

interface Props {
  user: AppUser
  sale: Sale
  handleclick: (e: MouseEvent<HTMLButtonElement>) => void
}

export const SaleModal: FC<Props> = ({ user, sale, handleclick }) => {
  const daysBetweenTwoDates = user.active_plan !== null
    ? getDaysBetweenTwoDates(user.active_plan.end_date, new Date())
    : 0

  return <Modal className={styles.card} isOpen={true}>

    <ModalContent>

      <ModalHeader className='flex items-center justify-between'>

        <User
          name={user.name}
          description={user.instagram_id}
          avatarProps={{
            src: user.image,
            size: 'md',
            isBordered: true,
            color: userColor(user)
          }}
        />

        <div className='flex gap-2'>
          <Chip color='warning' size='sm'>{sale.name}</Chip>
          <Chip color={sale.active ? 'success' : 'danger'} size='sm'>{sale.active ? 'vigente' : 'vencido'}</Chip>
        </div>

      </ModalHeader>

      <Divider />

      <ModalBody className='flex flex-col gap-2 w-full'>

        {user.active_plan !== null && <>

          <div className='flex items-center justify-between w-full'>
            Clases: {sale.taken_classes} / {sale.classes === -1 ? '∞' : sale.classes}

            {sale.classes !== -1 &&
              <Chip
                size='sm'
                variant='flat'
                color={sale.taken_classes < sale.classes
                  ? 'success'
                  : 'danger'}
              >
                {sale.taken_classes < sale.classes
                  ? `Quedan ${sale.classes - sale.taken_classes} clases`
                  : 'Se acabaron las clases'}
              </Chip>
            }
          </div>

          <span>Compa: {formardate(sale.sale_date)}</span>
          <span>Inicio: {formardate(sale.start_date)}</span>

          <div className='flex justify-between w-full gap-5'>

            Fin: {formardate(sale.end_date)}

            <Chip size='sm'
              variant='flat'
              color={daysBetweenTwoDates === 0
                ? 'warning'
                : daysBetweenTwoDates < 0 ? 'danger' : 'success'}
            >
              {daysBetweenTwoDates === 0
                ? 'Se vence hoy'
                : daysBetweenTwoDates > 0 ? `Quedan ${daysBetweenTwoDates} días` : `Tu plan se vención hace ${daysBetweenTwoDates} días`}
            </Chip>
          </div>

        </>}

        <Divider />

        <div className='flex items-center justify-between'>
          <Chip variant='flat' color='danger' size='sm'>Precio: ${sale.price}</Chip>
          <Chip variant='flat' color='warning' size='sm'>Descuento: ${sale.discount}</Chip>
          <Chip variant='flat' color='success' size='sm'>Precio final: ${sale.total_price}</Chip>
        </div>

      </ModalBody>

      <Divider />

      <ModalFooter className='flex items-center justify-between'>
        <Button color='danger' variant='flat' size='sm' value={sale.id} onClick={handleclick}>Cerrar</Button>
      </ModalFooter>

    </ModalContent>

  </Modal>
}
