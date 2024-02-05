// Libs
import { useState, useEffect, type ChangeEvent, type MouseEvent, type Dispatch, type SetStateAction } from 'react'

// Typos
import type { DanceClass, DanceDifficulty, DanceGender, DanceMode, User } from '@state'
import { useUsersState, useClassesState, usePacksState } from '@state'
import { createClass } from '@api'

interface Props {
  danceClass: DanceClass
  setInternalDanceClass: Dispatch<SetStateAction<DanceClass>>
  setIsOpenEditableModals: Dispatch<SetStateAction<Record<string, boolean>>>
  isOpnenEditableModals: Record<string, boolean>
}

interface DateToUpdate {
  user_id: string
  id: string
  start_date: Date
  end_date: Date
}

type nameOptions = 'teacher' | 'users' | 'mode' | 'difficulty' | 'gender' | 'mode' | 'preview'

export const useForm = ({ danceClass, setInternalDanceClass, setIsOpenEditableModals, isOpnenEditableModals }: Props) => {
  const [teachers, setTeachers] = useState<User[]>([])
  const addClass = useClassesState(state => state.addClass)
  const getTeachers = useUsersState(state => state.getTeachers)
  const udateUsersTakenClasses = useUsersState(state => state.udateUsersTakenClasses)
  const updateUsersDates = useUsersState(state => state.updateUsersDates)
  const packs = usePacksState(state => state.packs)
  const [arrowState, setArrowState] = useState<boolean>(false)

  useEffect(() => {
    setTeachers(getTeachers())
  }, [])

  // Botones de búsqueda usuarios y estilo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as 'price' | 'style'
    const value = e.currentTarget.value

    setInternalDanceClass({
      ...danceClass,
      [name]: value
    })
  }

  // Seleccionar items seleccionables
  const handleClick = (e: MouseEvent<HTMLLIElement>, name: nameOptions) => {
    const id = e.currentTarget.dataset.key as string

    if (name === 'teacher') {
      const usersIds = danceClass.users.map(user => user.id)
      const teacher = teachers.filter(item => item.id === id && !usersIds.includes(id))[0]
      setInternalDanceClass({ ...danceClass, teacher })
    } else if (name === 'gender') {
      const gender = e.currentTarget.dataset.key as DanceGender
      setInternalDanceClass({ ...danceClass, gender })
    } else if (name === 'difficulty') {
      const difficulty = e.currentTarget.dataset.key as DanceDifficulty
      setInternalDanceClass({ ...danceClass, difficulty })
    } else if (name === 'mode') {
      const mode = e.currentTarget.dataset.key as DanceMode
      setInternalDanceClass({ ...danceClass, mode })
    }
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'close' | 'save' | 'preview'

    if (name === 'preview') {
      setArrowState(!arrowState)
    }

    if (name === 'save') {
      e.preventDefault()

      // Vamos a comparar fechas
      const classDate = danceClass.date

      const usersDates = danceClass.users.map(user => {
        return {
          user_id: user.id,
          id: user.active_plan?.id as string,
          startDate: user.active_plan?.start_date as Date,
          packId: user.active_plan?.pack_id as string
        }
      })

      const usersIds = usersDates.map(item => item.user_id)

      const datesToUpdate: DateToUpdate[] = []

      // Si tomó clases antes de los 15 días
      usersDates.forEach(({ startDate, id, packId, user_id: userId }) => {
        if (classDate < startDate) {
          const { duration, period } = packs.filter(pack => pack.id === packId)[0]
          const endDate = new Date(classDate)

          if (period === 'month') {
            endDate.setMonth(endDate.getMonth() + duration)
            endDate.setDate(endDate.getDate() - 1)
          } else if (period === 'week') {
            endDate.setDate(endDate.getDate() + 7 * duration)
          }

          datesToUpdate.push({
            user_id: userId,
            id,
            start_date: classDate,
            end_date: endDate
          })
        }
      })
      // Actualizar las clases de los usuarios en el estado
      const isOpnenModals2 = JSON.parse(JSON.stringify(isOpnenEditableModals)) as Record<string, boolean>
      isOpnenModals2[danceClass.date.getDate()] = !isOpnenModals2[danceClass.date.getDate()]
      const [data] = await createClass(danceClass, datesToUpdate)

      setIsOpenEditableModals(isOpnenModals2)
      updateUsersDates(datesToUpdate)
      udateUsersTakenClasses(usersIds)
      addClass(`${classDate.getFullYear()}-${classDate.getMonth()}`, data)
    } else if (name === 'close') {
      const isOpnenModals2 = JSON.parse(JSON.stringify(isOpnenEditableModals)) as Record<string, boolean>

      isOpnenModals2[danceClass.date.getDate()] = !isOpnenModals2[danceClass.date.getDate()]
      setIsOpenEditableModals(isOpnenModals2)
    }
  }

  const getSelectedUsers = (users: User[]) => {
    setInternalDanceClass({
      ...danceClass,
      users
    })
  }

  return {
    teachers,
    setTeachers,
    handleSubmit,
    handleChange,
    handleClick,
    getSelectedUsers,
    arrowState
  }
}
