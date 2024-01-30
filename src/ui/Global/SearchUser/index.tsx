import { useUsersState, type User } from '@state'
import { Input, Button, Avatar, Divider } from '@nextui-org/react'
import { useState, type ChangeEvent, type MouseEvent, type FC, useEffect } from 'react'

interface Props {
  teacher: User
  usersOfClass: User[]
  getUsersIds?: (userIds: string[]) => void
  getSelectedUsers?: (users: User[]) => void
}

export const SearchUser: FC<Props> = ({ teacher, usersOfClass, getSelectedUsers, getUsersIds }) => {
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [usersIds, setUsersIds] = useState<string[]>(() => usersOfClass.map(user => user.id))
  const [selectedUsers, setSelectedUsers] = useState<User[]>(usersOfClass)

  const users = useUsersState(state => state.users)

  useEffect(() => {
    if (getSelectedUsers !== undefined) {
      getSelectedUsers(selectedUsers)
    }

    if (getUsersIds !== undefined) {
      getUsersIds(usersIds)
    }
  }, [usersIds, selectedUsers])

  // Botones de búsqueda usuarios y estilo
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value
    setSearch(value)

    if (value.length > 3) {
      // Filtrar bien la busqueda
      const internalUsers = users.filter(user => {
        const isNameMatching = user.name.toLowerCase().includes(value.toLowerCase())
        const isNotTeacher = user.id !== teacher.id
        const isNotIncluded = !usersIds.includes(user.id)

        return isNameMatching && isNotTeacher && isNotIncluded
      })
      setSearchResults(internalUsers)
    } else {
      setSearchResults([])
    }
  }

  // Manejar el agregar y eliminar usuarios
  const handleUser = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'add' | 'delete'
    const userId = e.currentTarget.value

    if (name === 'add') {
      const selectedUser = users.filter(user => user.id === userId && !usersIds.includes(userId))[0]
      const newSearchResults = searchResults.filter(seachResult => seachResult.id !== selectedUser.id)

      setSearchResults(newSearchResults)

      if (newSearchResults.length === 0) {
        setSearch('')
      }

      setUsersIds([...usersIds, selectedUser.id])
      setSelectedUsers([...selectedUsers, selectedUser])
    } else if (name === 'delete') {
      const filteredUsers = selectedUsers.filter(user => user.id !== userId)
      const filteredUsersIds = filteredUsers.map(user => user.id)
      setUsersIds(filteredUsersIds)
      setSelectedUsers(filteredUsers)
    }
  }

  return (<div>

    <Input
      type="text"
      label="Estudiantes"
      placeholder="Agregar Estudiantes"
      name='estudiantes'
      onChange={handleChange}
      value={search} />

    <div className='bg-red-500 w-100%'>
      {searchResults.map(user => <Button
        key={user.id}
        name='add'
        value={user.id}
        size='md'
        className='py-1 px-1'
        color={user.active_plan?.active === true ? 'success' : 'danger'}
        isDisabled={user.active_plan?.active === false}
        onClick={handleUser}>
        <Avatar src={user.image} size='sm' />
        {user.name}
      </Button>)}
    </div>

    <Divider />

    <div>
      {selectedUsers.map(user => <Button key={user.id} name='delete' value={user.id} size='md' className='py-1 px-1' onClick={handleUser}>
        <Avatar src={user.image} size='sm' />
        {user.name}
      </Button>)}
    </div>
  </div>)
}
