import { useUsersState, type User } from '@state'
import { Input, Button, Avatar, Divider, Card, CardBody, Chip } from '@nextui-org/react'
import { useState, type ChangeEvent, type MouseEvent, type FC, useEffect } from 'react'
import styles from './styles.module.css'
import { UserChip } from '../UserChip'
import { userColor } from '@/utils/users'

interface Props {
  teacher: User
  usersOfClass: User[]
  getUsersIds?: (userIds: string[]) => void
  getSelectedUsers?: (users: User[]) => void
  showSelectedUsers?: boolean
}

export const SearchUsers: FC<Props> = ({ teacher, usersOfClass, getSelectedUsers, getUsersIds, showSelectedUsers = true }) => {
  const [search, setSearch] = useState<string>('')
  const [searchResults, setSearchResults] = useState<User[]>([])
  const [usersIds, setUsersIds] = useState<string[]>(() => usersOfClass.map(user => user.id))
  const [selectedUsers, setSelectedUsers] = useState<User[]>(usersOfClass)

  const users = useUsersState(state => state.users)

  const usersByClass = selectedUsers.filter(item => ((item.active_plan?.active) ?? false) && item.role === 'user').length
  const courtesiesByClass = selectedUsers.filter(item => item.active_plan === null && item.role === 'user').length

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

  return (<div className='flex flex-col gap-2 relative'>

    <Input
      color='secondary'
      variant='bordered'
      type="text"
      label="Estudiantes"
      placeholder="Agregar Estudiantes"
      className='relavite'
      name='estudiantes'
      autoComplete='off'
      onChange={handleChange}
      value={search} />

    {searchResults.length > 0 && <Card className={styles.searchContainer}>
      {searchResults.map(user => <Button
        key={user.id}
        name='add'
        value={user.id}
        startContent={<Avatar src={user.image} size='sm' />}
        endContent={<UserChip user={user}></UserChip>}
        variant='flat'
        size='sm'
        className='h-12 flex items-center justify-between px-5'
        color={userColor(user)}
        isDisabled={user.active_plan?.active === false}
        onClick={handleUser}>
        {user.name}
      </Button>)}
    </Card>}

    {showSelectedUsers && <>
      <>

        {selectedUsers.length > 0 && <div className='flex gap-1 mt-2 mb-2'>
          {usersByClass > 0 && <Chip color='success' size='sm'>{usersByClass} Estudiantes</Chip>}
          {courtesiesByClass > 0 && <Chip color='warning' size='sm'>{courtesiesByClass} Cortesias </Chip>}
          <Chip color='secondary' size='sm'>Total: {courtesiesByClass + usersByClass} personas</Chip>
        </div>
        }

        {selectedUsers.map(user => <Card
          key={user.id}
          className='flex py-0.5 px-0.5'>
          <CardBody className='flex flex-row items-center justify-between align-middle'>
            <Avatar src={user.image} size='sm' />
            <span>{user.name}</span>
            <Button value={user.id} size='sm' onClick={handleUser} name='delete' color='danger' variant='flat'>delete</Button>
          </CardBody>
        </Card>)}

        {selectedUsers.length > 0 && <Divider />}

      </>
    </>}
  </div>)
}
