import { useMemo, useState } from 'react'
import { authApi } from '../api/services'
import { getApiError } from '../utils/errors'
import { AuthContext } from './auth-context'

const getStoredUser = () => {
  const value = localStorage.getItem('scms_user')
  return value ? JSON.parse(value) : null
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getStoredUser)
  const [isAuthLoading, setIsAuthLoading] = useState(false)

  const login = async (credentials) => {
    setIsAuthLoading(true)

    try {
      const { data } = await authApi.login(credentials)
      const loggedInUser = {
        email: data.email,
        role: data.role,
        expiresAt: data.expiresAt,
      }

      localStorage.setItem('scms_token', data.token)
      localStorage.setItem('scms_user', JSON.stringify(loggedInUser))
      setUser(loggedInUser)
      return loggedInUser
    } catch (error) {
      throw new Error(getApiError(error))
    } finally {
      setIsAuthLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('scms_token')
    localStorage.removeItem('scms_user')
    setUser(null)
  }

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthLoading,
      isAuthenticated: Boolean(user && localStorage.getItem('scms_token')),
    }),
    [user, isAuthLoading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
