import { useState } from 'react'

export default function useAuth() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')))
  const login = userObj => {
    setUser(userObj)
    localStorage.setItem('user', JSON.stringify(userObj))
  }
  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }
  return { user, login, logout }
} 