// Lib
import { Select, SelectItem, Input, Button, Accordion, AccordionItem, Divider } from '@nextui-org/react'
import type { Dispatch, SetStateAction, FC } from 'react'

// Componets
import { type DanceClass } from '@state'
import { danceGenders, danceMode, danceDifficulty } from '../../../../utils'
import { useForm } from './useForm'
import { SearchUsers } from '@/ui/Global/SearchUsers'
import styles from '../../styles.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'

interface Props {
  danceClass: DanceClass
  setIsOpenEditableModals: Dispatch<SetStateAction<Record<string, boolean>>>
  isOpnenEditableModals: Record<string, boolean>
  setInternalDanceClass: Dispatch<SetStateAction<DanceClass>>
}

export const Form: FC<Props> = ({ danceClass, setInternalDanceClass, setIsOpenEditableModals, isOpnenEditableModals }) => {
  const {
    teachers,
    handleChange,
    handleClick,
    handleSubmit,
    getSelectedUsers,
    arrowState
  } = useForm({ danceClass, setInternalDanceClass, setIsOpenEditableModals, isOpnenEditableModals })

  return (<div className={`${styles.editableModalForm} ${arrowState && styles.editableModalFormMoved}`}>

    <Button
      color='primary'
      size='sm'
      variant='light'
      name='preview'
      onClick={handleSubmit}
      startContent={<FontAwesomeIcon icon={faChevronDown} style={{ transform: arrowState ? 'rotate(180deg)' : 'none' }} />}>
      Vista Previa
    </Button>

    <SearchUsers
      teacher={danceClass.teacher}
      usersOfClass={danceClass.users}
      getSelectedUsers={getSelectedUsers}
    />

    <Accordion>
      <AccordionItem key="1" aria-label="Datos de la clase" title="Datos de la clase" subtitle='Modifique los datos de la clase (opcional)'>

        <div className='flex flex-col gap-2'>

          {teachers.length > 0 && <Select
            label='Profesor'
            items={teachers}
            placeholder='Seleccione el Profesor'
            size='sm'
            defaultSelectedKeys={[danceClass.teacher.id]}
            name='teacher'
            color='secondary'
            variant='bordered'>
            {teachers.map(teacher => {
              return <SelectItem
                color='secondary'
                key={teacher.id}
                onClick={e => { handleClick(e, 'teacher') }}>
                {teacher.name}
              </SelectItem>
            })}
          </Select>}

          <Select
            label='Genero'
            items={danceGenders}
            placeholder='Seleccione el genero'
            size='sm'
            defaultSelectedKeys={[danceClass.gender]}
            variant='bordered'
            color='secondary'>
            {danceGenders.map(gender => <SelectItem
              color='secondary'
              key={gender}
              onClick={e => { handleClick(e, 'gender') }}>
              {gender}
            </SelectItem>)}
          </Select>

          {danceDifficulty.length > 0 && <Select
            variant='bordered'
            color='secondary'
            label='Dificultad'
            items={danceDifficulty}
            placeholder='Seleccione la dificultad'
            size='sm'
            defaultSelectedKeys={[danceClass.difficulty]}
          >
            {danceDifficulty.map(difficulty => <SelectItem
              color='secondary'
              key={difficulty}
              onClick={e => { handleClick(e, 'difficulty') }}>
              {difficulty}
            </SelectItem>)}
          </Select>}

          <Select
            label='Modo de Baile'
            items={danceMode}
            placeholder='Seleccione el Modo de Baile'
            size='sm'
            variant='bordered'
            color='secondary'
            defaultSelectedKeys={[danceClass.mode]}
          >
            {danceMode.map(mode => <SelectItem
              color='secondary'
              key={mode}
              onClick={e => { handleClick(e, 'mode') }}>
              {mode}
            </SelectItem>)}
          </Select>

          <Input
            variant='bordered'
            color='secondary'
            type="text"
            label="style"
            placeholder="El estilo de la clase"
            name='estilo'
            autoComplete='off'
            onChange={handleChange}
            value={danceClass.style}
          />

          <Input
            variant='bordered'
            color='secondary'
            type="number"
            label="Precio"
            autoComplete='off'
            placeholder="Costo de la clase"
            name='price' onChange={handleChange}
            value={String(danceClass.price)}
          />

        </div>

      </AccordionItem>
    </Accordion>

    <Divider />

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
