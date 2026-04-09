import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000'
const TOKEN_KEY   = 'citizen_ai_token'
const USER_KEY    = 'citizen_ai_user'

export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(() => JSON.parse(localStorage.getItem(USER_KEY)) || null)
  const [token,   setToken]   = useState(() => localStorage.getItem(TOKEN_KEY) || null)
  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')

  const saveSession = (userData, jwt) => {
    setUser(userData)
    setToken(jwt)
    localStorage.setItem(USER_KEY,  JSON.stringify(userData))
    localStorage.setItem(TOKEN_KEY, jwt)
  }

  const clearSession = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem(TOKEN_KEY)
  }

  // ── Email Login ──
  const login = async (email, password) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error); return false }
      saveSession(data.user, data.token)
      return true
    } catch {
      setError('Server error. Make sure backend is running.')
      return false
    } finally { setLoading(false) }
  }

  // ── Email Signup ──
  const signup = async (name, email, password) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/signup`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, password }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error); return false }
      saveSession(data.user, data.token)
      return true
    } catch {
      setError('Server error. Make sure backend is running.')
      return false
    } finally { setLoading(false) }
  }

  // ── Google Login ──
  const googleLogin = async (name, email, googleId, avatar) => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ name, email, googleId, avatar }),
      })
      const data = await res.json()
      if (!data.success) { setError(data.error); return false }
      saveSession(data.user, data.token)
      return true
    } catch {
      setError('Server error. Make sure backend is running.')
      return false
    } finally { setLoading(false) }
  }

  // ── Logout ──
  const logout = () => clearSession()

  return (
    <AuthContext.Provider value={{
      user, token, loading, error, setError,
      isLoggedIn: !!user,
      login, signup, googleLogin, logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}