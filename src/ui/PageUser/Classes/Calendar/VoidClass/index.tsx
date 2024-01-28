// Lib
import { useState, type MouseEvent } from 'react'
import { Modal, ModalContent, Button } from '@nextui-org/react'

// Component | Types
import { type ScheduleClass } from '@state'
import { Info } from '../ClassPortal/Info'
import { Form } from '../ClassPortal/Form'
import { useVoidClass } from './useVoidClass'
import styles from './styles.module.css'

interface Props {
  danceClass: ScheduleClass
  day: number
  month: number
  year: number
}

type ButtonAction = 'open' | 'close' | 'save'

export const VoidClass = ({ danceClass, day, month, year }: Props) => {
  const [openThisPortal, setOpenThisPortal] = useState<boolean>(false)
  const { internalDanceClass, setInternalDanceClass } = useVoidClass({ danceClass, day, year, month })

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
      size='sm'
      radius='sm'
      name='open'
    >
      {internalDanceClass.gender}
    </Button>

    {openThisPortal && <Modal isOpen={true} backdrop='blur' size='3xl'>
      <ModalContent className={`${styles.modalContainer}`}>

        <Info
          danceClass={internalDanceClass}
          day={day}
          month={month}
          year={year}
          editable={true}
        />

        <Form
          danceClass={internalDanceClass}
          setOpenThisPortal={setOpenThisPortal}
          setInternalDanceClass={setInternalDanceClass}
        />

      </ModalContent>
    </Modal >}
  </>
}
