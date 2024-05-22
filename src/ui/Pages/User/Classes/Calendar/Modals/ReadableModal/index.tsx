import { useState, type FC, type MouseEvent, useRef } from 'react'
import { Button, Modal, ModalContent, ModalFooter } from '@nextui-org/react'
import { Info } from '../EditableModal/Info'
import styles from '../styles.module.css'
import { useClassesState, useUsersState, type DanceClass, type User } from '@/state'
import { updateClasses } from '@/api/classes/updateClass'

interface Props {
  dayOfMonth: number
  month: number
  year: number
  handleClick: (e: MouseEvent<HTMLButtonElement>, day: number) => void
  danceClass: DanceClass
}

export const ReadableModal: FC<Props> = ({ dayOfMonth, month, year, handleClick, danceClass }) => {
  const globalUsers = useUsersState(state => state.users)
  const updateClass = useClassesState(state => state.updateClass)
  const updateUsersPacks = useUsersState(state => state.updateUsersPacks)

  const oldUsersIds = danceClass.users.map(user => user.id)
  const oldUsers = globalUsers.filter(user => oldUsersIds.includes(user.id))

  const [toUpdate, setToUpdate] = useState<boolean>(false)
  const [users, setUsers] = useState<User[]>([])
  const [usersToAdd, setUsersToAdd] = useState<User[]>([])
  const [usersToDelete, setUsersToDelete] = useState<User[]>([])
  const [saveIsDesables, setSaveIsDesables] = useState<boolean>(false)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const getSelectedUsers = (users: User[]) => {
    const usersIds = users.map(user => user.id)

    const usersToAdd2 = users.filter(user => !oldUsersIds.includes(user.id))
    const usersToDelete2 = oldUsers.filter(user => !usersIds.includes(user.id))

    setUsers(users)
    setUsersToAdd(usersToAdd2)
    setUsersToDelete(usersToDelete2)
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    setSaveIsDesables(true)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await updateClasses({ usersToAdd, usersToDelete, users, classId: danceClass.id })
    updateClass(danceClass.date, danceClass.id, users)
    updateUsersPacks(response)
    buttonRef.current?.click()
  }

  return <Modal isOpen={true} backdrop='blur' className={styles.readableModal} placement='center'>
    <ModalContent >

      <Info
        danceClass={danceClass}
        dayOfMonth={dayOfMonth}
        month={month}
        year={year}
        editable={false}
        toUpdate={toUpdate}
        setToUpdate={setToUpdate}
        oldUsers={oldUsers}
        oldUsersIds={oldUsersIds}
        getSelectedUsers={getSelectedUsers}
      />

      <ModalFooter>
        {toUpdate && <Button name='readable' color='primary' onClick={handleSubmit} isDisabled={saveIsDesables}>
          Guardar
        </Button>}
        <Button ref={buttonRef} color="danger" variant="flat" name='readable' onClick={e => { handleClick(e, dayOfMonth) }}>
          Cerrar
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
}
