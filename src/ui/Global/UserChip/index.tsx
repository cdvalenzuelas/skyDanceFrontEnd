import type { User } from '@/state'
import { Chip } from '@nextui-org/react'
import type { FC } from 'react'

interface Props {
  user: User
}

export const UserChip: FC<Props> = ({ user }) => {
  return <Chip
    size='sm'
    color={user.active_plan === null ? 'warning' : user.active_plan.active ? 'success' : 'danger'}>
    {user.active_plan === null
      ? 'cortesia'
      : user.active_plan.active ? 'activo' : 'inactivo'}
  </Chip>
}
