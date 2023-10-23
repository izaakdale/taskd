import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full">
      <div className="w-full my-16">
        <div className="text-center mb-8 text-xl">Taskd, the task manager</div>
        <div className="flex justify-center">
          <Link to={'/tasks'} className="border-[0.5px] p-2 rounded bg-slate-900 hover:bg-slate-950 transition ease-in-out duration-200 hover:shadow-xl text-sm">go to my tasks</Link>
        </div>
      </div>
    </div>
  )
}
