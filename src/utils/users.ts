import type { User } from '@/state'

export const userColor = (user: User) => {
  return user.active_plan === null
    ? 'warning'
    : user.active_plan.active ? 'success' : 'danger'
}
