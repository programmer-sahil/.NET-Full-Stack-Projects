import { useMemo, useState } from 'react'
import { AuthContext } from './auth-context.js'

function readStoredUser() {
  const stored = localStorage.getItem('jobtracker_user')

  if (!stored) {
    return null
  }

  try {
    return JSON.parse(stored)
  } catch {
    localStorage.removeItem('jobtracker_user')
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('jobtracker_token'))
  const [user, setUser] = useState(readStoredUser)

  function login(authResponse) {
    const nextUser = {
      fullName: authResponse.fullName,
      email: authResponse.email,
    }

    localStorage.setItem('jobtracker_token', authResponse.token)
    localStorage.setItem('jobtracker_user', JSON.stringify(nextUser))
    setToken(authResponse.token)
    setUser(nextUser)
  }

  function logout() {
    localStorage.removeItem('jobtracker_token')
    localStorage.removeItem('jobtracker_user')
    setToken(null)
    setUser(null)
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      login,
      logout,
    }),
    [token, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
