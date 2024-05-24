import { createClass } from '@/api/classes/createClass'
import { type DanceClass } from '@state'

interface Props {
  danceClass: DanceClass
}

export const useDeleteClass = ({ danceClass }: Props) => {
  const deleteClass = async () => {
    let newClassToCreate = JSON.parse(JSON.stringify(danceClass)) as DanceClass

    newClassToCreate = {
      ...newClassToCreate,
      canceled: true,
      price: 0,
      users: [],
      done: true
    }

    const [data] = await createClass(newClassToCreate, [])

    const date = new Date(data.date)

    return { data, date }
  }

  return { deleteClass }
}
