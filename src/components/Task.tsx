import {BsFillTrash3Fill} from 'react-icons/bs'

type Props = {
  task: Task
  onDelete: (id: string) => Promise<void>
}

export interface Task {
  id: string
  name: string
  description: string
}

export function TaskCard(props: Props) {
  return (
    <div className="border-[0.5px] my-1 md:mx-2 p-4 rounded relative">
      <BsFillTrash3Fill onClick={() => props.onDelete(props.task.id)} className="absolute left-2 top-2 text-gray-500 hover:text-white hover:cursor-pointer"/>
      <h1 className="font-semibold">{props.task.name}</h1>
      <p className="text-gray-500">{props.task.description}</p>
    </div>
  )
}
