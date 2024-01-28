// Lib
import { useState, type MouseEvent } from 'react'
import { Modal, ModalContent, ModalFooter, Button } from '@nextui-org/react'

// Component | Types
import { Info } from '../ClassPortal/Info'
import { useUserState, type DanceClass } from '@state'
import styles from './styles.module.css'

interface Props {
  danceClass: DanceClass
  day: number
  month: number
  year: number
}

type ButtonAction = 'open' | 'close' | 'save'

export const EditableClass = ({ danceClass, year, month, day }: Props) => {
  const id = useUserState(state => state.id)
  const usersIds = danceClass.users.map(item => item.id)

  const [openThisPortal, setOpenThisPortal] = useState<boolean>(false)

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as ButtonAction

    if (name === 'open') {
      setOpenThisPortal(true)
    } else if (name === 'close') {
      setOpenThisPortal(false)
    } else if (name === 'save') {
      console.log('grardar la info')
    }
  }

  return <>
    <Button
      onClick={handleClick}
      color={usersIds.includes(id) ? 'success' : 'default'}
      size='sm'
      radius='sm'
      name='open'
    >
      {danceClass.gender}
    </Button>

    {openThisPortal && <Modal isOpen={true} backdrop='blur'>
      <ModalContent className={`${styles.modalContainer}`}>

        <Info danceClass={danceClass} day={day} month={month} year={year} editable={false} />

        <ModalFooter>
          <Button color="danger" variant="light" name='close' onClick={handleClick}>
            Cerrar
          </Button>
          <Button color="primary" name='save' onClick={handleClick}>
            Guardar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>}
  </>
}
