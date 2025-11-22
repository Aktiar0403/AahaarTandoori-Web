import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Login from './components/Login'
import Home from './components/Home'
import Menu from './components/Menu'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Layout from './components/Layout'

function App() {
  const { user } = useAuth()

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={user ? <Layout><Home /></Layout> : <Navigate to="/login" />} />
          <Route path="/menu" element={user ? <Layout><Menu /></Layout> : <Navigate to="/login" />} />
          <Route path="/cart" element={user ? <Layout><Cart /></Layout> : <Navigate to="/login" />} />
          {user?.role === 'admin' && (
            <Route path="/admin" element={<Layout><Admin /></Layout>} />
          )}
        </Routes>
      </div>
    </Router>
  )
}

export default App