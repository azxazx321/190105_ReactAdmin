import React from 'react'
import { BrowserRouter, Link, Routes,Route} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Login from './pages/login/login'


export default function App() {
  return (
    
      <BrowserRouter> 
          {/* link is to add path to the address */}
          {/* <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link> */}
          {/* routes is to render components 
          switch has been removed in 6.0*/}
          <Routes>
            <Route path="/login"  element={<Login/>} />
            <Route path="/admin" element={<Admin/>} />
          </Routes>
      </BrowserRouter>
      
    
  )
}
