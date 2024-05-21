import { Card, CardBody } from '@nextui-org/react'
import styles from '../../styles.module.css'
import { type FC } from 'react'
import { type User, type DanceClass } from '@/state'
import { SearchUsers } from '@/ui/Global/SearchUsers'

interface Props {
  danceClass: DanceClass
  oldUsers?: User[]
  getSelectedUsers?: (users: User[]) => void
}

export const ToUpdate: FC<Props> = ({ danceClass, oldUsers, getSelectedUsers }) => {
  return <Card className={`${styles.info} py-3 my-2`}>
    <CardBody className='px-5 py-2 my-3'>

      <SearchUsers
        teacher={danceClass.teacher}
        usersOfClass={danceClass.users}
        getSelectedUsers={getSelectedUsers}
      />

    </CardBody>

  </Card>
}
