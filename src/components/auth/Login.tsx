import { useAuth0 } from "@auth0/auth0-react"

export default function Login() {
  const {loginWithRedirect} = useAuth0()

  return (
    <div>
      <button onClick={()=>loginWithRedirect({ appState: {returnTo: window.location.pathname} })}>login</button>
    </div>
  )
}
