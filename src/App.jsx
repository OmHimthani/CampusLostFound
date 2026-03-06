import React, { useEffect, useState } from 'react'
import SignUp from './SignUp'
import Login from './Login'
import Homepage from './Homepage'
import FrontPage from './FrontPage'
import FoundForm from './FoundForm'
import FoundItems from './FoundItems'
import LostForm from './LostForm'
import LostItems from './LostItems'
import { Route, Routes, useNavigate } from 'react-router-dom'
import supabase from './client'
import { Navigate } from 'react-router-dom'
const App = () => {
  const navigate=useNavigate()
const [mySession,setMySession]=useState(null)
const getSession = async () => {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error(error);
    return null;
  }

  if (!data.session) return null;

  return data.session;
};

useEffect(() => {
  const fetchSession = async () => {
    const session = await getSession();
    console.log(session);
    setMySession(session)
  };

  fetchSession();
}, []);

  return (
    <>
      <Routes>
        <Route path={'/'} element={<FrontPage />} />
        <Route path={'/login'} element={<Login  />} />
        <Route path={'/signup'} element={<SignUp />} />
       <Route path={'/Homepage'} element={mySession ?<Homepage  /> : <Navigate to="/login" />} />
<Route path={'/FoundForm'} element={mySession ?<FoundForm  />: <Navigate to="/login" />} />
<Route path={'/FoundItems'} element={mySession ?<FoundItems  />: <Navigate to="/login" />} />
<Route path={'/LostForm'} element={mySession ?<LostForm  />:<Navigate to="/login" />} />
<Route path={'/LostItems'} element={mySession ?<LostItems  />: <Navigate to="/login" />} />
        
      </Routes>
    </>
  )
}

export default App
