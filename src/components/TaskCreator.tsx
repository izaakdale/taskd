import {AiOutlinePlusCircle} from 'react-icons/ai'

type Props = {
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  createTask: () => Promise<void>
}

export default function TaskCreator(props: Props) {
  return (
    <div>
      <div className="flex flex-col">
        <h1 className='text-center py-4'>Task Creator</h1>
        <input placeholder='title' onChange={(e) => props.onChange(e)} className='my-1 bg-slate-300 bg-opacity-10 p-1' type="text" id="name" />
        <textarea placeholder='description' onChange={(e) => props.onChange(e)} className='my-1 bg-slate-300 bg-opacity-10 p-1' id="description" rows={10}></textarea>
        <div className="w-full flex justify-center my-1">
          <AiOutlinePlusCircle onClick={() => props.createTask()} className="text-2xl"/>
        </div>
      </div>
    </div>
  )
}
