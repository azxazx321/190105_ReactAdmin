import React, { Fragment } from 'react'
import {  Link, Routes,Route, Navigate} from 'react-router-dom'
import Admin from './pages/admin/admin'
import Home from './pages/home/home'
import Login from './pages/login/login'
import Product from './pages/product/product';
import User from './pages/user/user';
import Role from './pages/role/role';


export default function App() {
  return (
          <Fragment>
          {/* link is to add path to the address */}
          <Link to="/login">Login</Link>
          <Link to="/admin">Admin</Link>
          {/* <Link to="/admin/home">home</Link> */}

          {/* routes is to render components 
          switch has been removed in 6.0*/}
          <Routes>
            <Route path="/login"  element={<Login/>} />
            {/* 嵌套的 parent route 的 path 不用加*。但如果不是嵌套，而是分散在子组件中，就需要尾部加上* */}
            <Route path="/admin/*" element={<Admin/>} >
              {/* <Route path="home" element={<Home />} />
              <Route path="user" element={<User />} />
              <Route path="role" element={<Role />} />
              <Route path="product" element={<Product />} />

              <Route path="*" element={<Home />} />                  */}

            </Route>
          </Routes>
     
          </Fragment>
    
  )
}
