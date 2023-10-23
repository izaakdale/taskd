import { Link } from "react-router-dom";
import AuthButton from "./auth/AuthButton";

export default function Header() {
  return (
    <div className="flex justify-between items-center bg-slate-800 h-[8vh] px-3 lg:px-16 md:px-12 shadow-xl border-b-2 border-slate-600">
      {/* left */}
      <Link to={'/'}>
        <span className="text-gray-300">task</span>
        <span className="text-gray-500">d</span>
      </Link>

      {/* right */}
      <div className="text-gray-300 hover:text-white">
        <AuthButton/>
      </div>
    </div>
  )
}
