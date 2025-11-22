import React, { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const userData = localStorage.getItem('user')
    if (userData) {
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = (mobileNumber, code) => {
    let role = ''
    
    if (code === 'AAHAR2024') {
      role = 'admin'
    } else if (code === 'CUSTOMER24') {
      role = 'customer'
    } else {
      throw new Error('Invalid code. Please try again.')
    }

    const userData = {
      mobileNumber,
      role,
      loginTime: new Date().toISOString()
    }

    setUser(userData)
    localStorage.setItem('user', JSON.stringify(userData))
    return { success: true, role }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const value = {
    user,
    login,
    logout,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}