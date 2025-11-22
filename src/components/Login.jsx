import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    try {
      await login(mobileNumber, code)
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gold mb-2">Aahaar</h1>
          <p className="text-gray-400">Tandoori Restaurant</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-900 border border-red-700 text-white px-4 py-3 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-medium mb-2">
              Secret Code
            </label>
            <input
              type="password"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold"
              placeholder="Enter secret code"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gold hover:bg-gold-dark text-gray-900 font-bold py-3 px-4 rounded-lg transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-8 p-4 bg-gray-700 rounded-lg">
          <h3 className="text-gold font-semibold mb-2">Need a code?</h3>
          <p className="text-gray-300 text-sm">
            For admin access: <strong>AAHAR2024</strong><br />
            For customer access: <strong>CUSTOMER24</strong>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login