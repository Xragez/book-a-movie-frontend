import { useContext } from 'react'
import AuthContext from '../context/authContext'
import jwt_decode from 'jwt-decode'


function useAuth() {
  const authContext = useContext(AuthContext)

  const auth = authContext.user

  const setAuth = (token) => {
    if (token) {
      // login
      const decoded = jwt_decode(token)
      const user = {
        token: token,
        firstName: decoded.firstName,
        surname: decoded.surname,
        username: decoded.sub,
        userId: decoded.userId,
        roles: decoded.roles
      }
      authContext.login(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    } else {
      // logout
      authContext.logout()
      window.localStorage.removeItem('user')
    }
  }

  return [auth, setAuth]
}

export default useAuth