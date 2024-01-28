// Libs
import { useState, useEffect, type ChangeEvent, type MouseEvent, type Dispatch, type SetStateAction } from 'react'

// Typos
import type { DanceClass, DanceDifficulty, DanceGender, DanceMode, MinimalUser } from '@state'
import { useUsersState, useClassesState } from '@state'
import { createClass } from '@api'

interface Props {
  setOpenThisPortal: Dispatch<SetStateAction<boolean>>
  danceClass: DanceClass
  setInternalDanceClass: Dispatch<SetStateAction<DanceClass>>
}

type nameOptions = 'teacher' | 'users' | 'mode' | 'difficulty' | 'gender' | 'mode'

export const useForm = ({ setOpenThisPortal, danceClass, setInternalDanceClass }: Props) => {
  const [teachers, setTeachers] = useState<MinimalUser[]>([])
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<MinimalUser[]>([])
  const addClass = useClassesState(state => state.addClass)

  const getTeachers = useUsersState(state => state.getTeachers)
  const users = useUsersState(state => state.users)

  useEffect(() => {
    setTeachers(getTeachers())
  }, [])

  // Botones de búsqueda usuarios y estilo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name as 'estudiantes' | 'estilo'
    const value = e.currentTarget.value

    if (name === 'estudiantes') {
      setSearch(value)

      if (value.length > 3) {
        const usersIds = danceClass.users.map(user => user.id)
        // Filtrar bien la busqueda
        const internalUsers = users.filter(user => {
          const isNameMatching = user.name.toLowerCase().includes(value.toLowerCase())
          const isNotTeacher = user.id !== danceClass.teacher.id
          const isNotIncluded = !usersIds.includes(user.id)

          return isNameMatching && isNotTeacher && isNotIncluded
        })
        setSearchResults(internalUsers)
      } else {
        setSearchResults([])
      }
    } else if (name === 'estilo') {
      setInternalDanceClass({
        ...danceClass,
        style: value
      })
    }
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
      console.log(gender)
      setInternalDanceClass({ ...danceClass, gender })
    } else if (name === 'difficulty') {
      const difficulty = e.currentTarget.dataset.key as DanceDifficulty
      setInternalDanceClass({ ...danceClass, difficulty })
    } else if (name === 'mode') {
      const mode = e.currentTarget.dataset.key as DanceMode
      setInternalDanceClass({ ...danceClass, mode })
    }
  }

  // Manejar el agregar y eliminar usuarios
  const handleUser = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'add' | 'delete'
    const userId = e.currentTarget.value

    if (name === 'add') {
      const usersIds = danceClass.users.map(user => user.id)
      const internalUser = users.filter(user => user.id === userId && !usersIds.includes(userId))[0]
      setInternalDanceClass({ ...danceClass, users: [...danceClass.users, internalUser] })
    } else if (name === 'delete') {
      const filteredUsers = danceClass.users.filter(user => user.id !== userId)
      setInternalDanceClass({ ...danceClass, users: [...filteredUsers] })
    }
  }

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'close' | 'submit'

    if (name === 'close') {
      setOpenThisPortal(false)
    } else if (name === 'submit') {
      e.preventDefault()
      const [data] = await createClass(danceClass)
      addClass(data)
      setOpenThisPortal(false)
    }
  }

  return {
    teachers,
    setTeachers,
    search,
    searchResults,
    setSearchResults,
    handleSubmit,
    handleChange,
    handleClick,
    handleUser
  }
}
