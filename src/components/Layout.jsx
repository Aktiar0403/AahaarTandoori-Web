import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

const Layout = ({ children }) => {
  const { user, logout } = useAuth()
  const { cart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gold">Aahaar Tandoori</h1>
            <div className="flex items-center space-x-4">
              <span className="text-white">Welcome, {user?.mobileNumber}</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex space-x-8">
            <Link
              to="/"
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                isActive('/') 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Home
            </Link>
            <Link
              to="/menu"
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                isActive('/menu') 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Menu
            </Link>
            <Link
              to="/cart"
              className={`py-4 px-2 border-b-2 font-medium text-sm ${
                isActive('/cart') 
                  ? 'border-gold text-gold' 
                  : 'border-transparent text-gray-300 hover:text-white'
              }`}
            >
              Cart ({cart.length})
            </Link>
            {user?.role === 'admin' && (
              <Link
                to="/admin"
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  isActive('/admin') 
                    ? 'border-gold text-gold' 
                    : 'border-transparent text-gray-300 hover:text-white'
                }`}
              >
                Admin
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  )
}

export default Layout