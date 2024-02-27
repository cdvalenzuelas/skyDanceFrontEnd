import type { Dispatch, FC, SetStateAction } from 'react'
// import { ProductsAccordeon } from './ProductsAccordeon'
// import { NewSaleModal } from './NewSaleModal.tsx'
import { type DanceClass, useClassesState, type User } from '@/state'
import { Avatar, Button, Chip } from '@nextui-org/react'
import { formatCurency } from '@/utils/currency'

interface Props {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
}

type ClassesByTeacher = Record<string, DanceClass[]>

export const Teachers: FC<Props> = ({ isOpen, setIsOpen }) => {
  // const sales = useSalesState(state => state.sales)
  /* const handleOpen = (e: MouseEvent<HTMLButtonElement>) => {
    const name = e.currentTarget.name as 'open' | 'close'

    setIsOpen(name === 'open')
  } */

  const classesStore = useClassesState(state => state.classesStore)
  // const users = useUsersState(state => state.users)

  const teachers: User[] = []

  const classesByTeacher: ClassesByTeacher = {}

  Object.values(classesStore).flat().forEach(internalClass => {
    const key = internalClass.teacher.id

    if (Object.keys(classesByTeacher).includes(key)) {
      classesByTeacher[key] = [...classesByTeacher[key], internalClass]
    } else {
      teachers.push(internalClass.teacher)
      classesByTeacher[key] = [internalClass]
    }
  })

  return <>
    <h1>Profesores</h1>

    <div className='flex flex-col gap-2 px-5'>

      {Object.keys(classesByTeacher).map(teacherId => {
        const teacher = teachers.filter(teacher => teacherId === teacher.id)[0]
        const debt = classesByTeacher[teacherId].reduce((a, b) => a + b.price, 0)

        return <Button
          className='h-14 flex items-center justify-between py-2'
          color={debt >= 0 ? 'warning' : 'success'}
          size='lg'
          variant='flat'
          style={{ order: debt * -1 }}

          startContent={<Avatar
            size='sm'
            isBordered
            color='secondary'
            src={teacher.image}
          />}

          endContent={<Chip size='sm' color={debt >= 0 ? 'warning' : 'success'}>
            $ {formatCurency(debt)}
          </Chip>}

          key={teacherId}>
          {teacher.name}
        </Button>
      })}

    </div>

    {/* <ProductsAccordeon />

    {isOpen && <NewSaleModal
      isOpen={true}
      handleOpen={handleOpen}
      setIsOpen={setIsOpen}
    />} */}
  </>
}
