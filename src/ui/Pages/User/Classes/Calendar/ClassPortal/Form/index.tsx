// Lib
import { Select, SelectItem, Input, Button } from '@nextui-org/react'
import type { Dispatch, SetStateAction, FC } from 'react'

// Componets
import { type DanceClass } from '@state'
import { danceGenders, danceMode, danceDifficulty } from '../../utils'
import { useForm } from './useForm'
import { SearchUser } from '@/ui/Global/SearchUser'
import styles from '../../VoidClass/styles.module.css'

interface Props {
  danceClass: DanceClass
  setOpenThisPortal: Dispatch<SetStateAction<boolean>>
  setInternalDanceClass: Dispatch<SetStateAction<DanceClass>>
}

export const Form: FC<Props> = ({ danceClass, setOpenThisPortal, setInternalDanceClass }) => {
  const {
    teachers,
    handleChange,
    handleClick,
    handleSubmit,
    getSelectedUsers
  } = useForm({ setOpenThisPortal, danceClass, setInternalDanceClass })

  return (<div className={`${styles.form}`}>

    {teachers.length > 0 && <Select
      label='Profesor'
      items={teachers}
      placeholder='Seleccione el Profesor'
      size='sm'
      defaultSelectedKeys={[danceClass.teacher.id]}
      name='teacher'
    >
      {teachers.map(teacher => { return <SelectItem key={teacher.id} onClick={e => { handleClick(e, 'teacher') }}>{teacher.name}</SelectItem> })}
    </Select>}

    <Select
      label='Genero'
      items={danceGenders}
      placeholder='Seleccione el genero'
      size='sm'
      defaultSelectedKeys={[danceClass.gender]}
    >
      {danceGenders.map(gender => <SelectItem key={gender} onClick={e => { handleClick(e, 'gender') }}>{gender}</SelectItem>)}
    </Select>

    {danceDifficulty.length > 0 && <Select
      label='Dificultad'
      items={danceDifficulty}
      placeholder='Seleccione el genero'
      size='sm'
      defaultSelectedKeys={[danceClass.difficulty]}
    >
      {danceDifficulty.map(difficulty => <SelectItem key={difficulty} onClick={e => { handleClick(e, 'difficulty') }}>{difficulty}</SelectItem>)}
    </Select>}

    <Select
      label='Modo de Baile'
      items={danceMode}
      placeholder='Seleccione el Modo de Baile'
      size='sm'
      defaultSelectedKeys={[danceClass.mode]}
    >
      {danceMode.map(mode => <SelectItem key={mode} onClick={e => { handleClick(e, 'mode') }}>{mode}</SelectItem>)}
    </Select>

    <Input type="text" label="Estilo" placeholder="El estilo de la clase" name='estilo' onChange={handleChange} />

    <SearchUser
      teacher={danceClass.teacher}
      usersOfClass={danceClass.users}
      getSelectedUsers={getSelectedUsers}
    />

    <footer>
      <Button color="danger" variant="light" name='close' onClick={handleSubmit}>
        Cerrar
      </Button>
      <Button color="primary" name='save' onClick={handleSubmit}>
        Guardar
      </Button>
    </footer>

  </div>)
}
