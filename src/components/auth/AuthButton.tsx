import { useAuth0 } from "@auth0/auth0-react"
import Login from "./Login"
import Logout from "./Logout"

export default function AuthButton() {

  const {user, isAuthenticated} = useAuth0()
  return (
    <>
      {isAuthenticated && user ? <Logout/> : <Login/>}
    </>
  )
}
