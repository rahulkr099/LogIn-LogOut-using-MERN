import { Navigate,Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './pages/Login';
import Signup from './pages/Signup'
import Home from './pages/Home'
import RefreshHandler from './pages/RefreshHandler';
import { useState } from 'react';
function App() {
  const [isAuthenticated, setIsAuthenticated]=useState(false);

  const PrivateRoute = ({element}) =>{
    return isAuthenticated?element : <Navigate to='/login'/>
  }

  return (
    <div>
      {/* jab tak user ke pass token h, tab tak user ko koi home se nhi nikaal skta h */}
      <RefreshHandler setIsAuthenticated={setIsAuthenticated}/>
    <Routes>
    <Route path='/' element={<Navigate to='/login'/>}/>
    {/* jab user authenticate nhi hoga tab, privateroute usko login par hi rakhega */}
    <Route path='/home' element={<PrivateRoute element={<Home/>}/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </div>
  )
}

export default App
