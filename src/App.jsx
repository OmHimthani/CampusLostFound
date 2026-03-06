import React, { useEffect, useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'
import Homepage from './Homepage'
import FrontPage from './FrontPage'
import FoundForm from './FoundForm'
import FoundItems from './FoundItems'
import LostForm from './LostForm'
import LostItems from './LostItems'
import { Route, Routes } from 'react-router-dom'
import supabase from './client'
import { Navigate } from 'react-router-dom'

const App = () => {
  const [mySession, setMySession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data }) => {
      setMySession(data.session)
      setLoading(false)
    })

    // Listen for login / logout / token refresh events
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setMySession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Don't render routes until we know the session status
  if (loading) return null

  return (
    <>
      <Routes>
        <Route path='/' element={<FrontPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/Homepage' element={mySession ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/FoundForm' element={mySession ? <FoundForm /> : <Navigate to="/login" />} />
        <Route path='/FoundItems' element={mySession ? <FoundItems /> : <Navigate to="/login" />} />
        <Route path='/LostForm' element={mySession ? <LostForm /> : <Navigate to="/login" />} />
        <Route path='/LostItems' element={mySession ? <LostItems /> : <Navigate to="/login" />} />
      </Routes>
    </>
  )
}

export default App