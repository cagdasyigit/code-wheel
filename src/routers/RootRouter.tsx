import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../components/Home'
import AuthStore from '../stores/AuthStore'
import Login from '../components/Login'

const RootRouter = () => {
  const isAuthenticated = AuthStore((state) => state.isAuthenticated)

  return (
    <Routes>
      <Route
        path={'/'}
        element={isAuthenticated ? <Home /> : <Navigate to={'/login'} />}
      />
      <Route
        path={'/home'}
        element={isAuthenticated ? <Home /> : <Navigate to={'/login'} />}
      />
      <Route path={'/login'} element={<Login />} />
    </Routes>
  )
}

export default RootRouter
