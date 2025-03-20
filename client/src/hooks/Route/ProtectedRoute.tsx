import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const ProtectedRoute = ({ isAuthenticated }: {isAuthenticated: boolean}) => {
    return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute