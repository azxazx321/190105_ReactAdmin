//left nevigation components
import React from 'react'
import LeftNavMenu from './left-nav-menu'
import logo from '../../assets/images/logo.png'
import './index.less'
import { Link, useLocation } from 'react-router-dom'



export default function LeftNav() {
  let location = useLocation()
  console.log('leFT NaV :>> ',location);
  
  return (
    <div>
      <div className='left-nav'>
        <nav>
      <Link to='/' className='left-nav-header'>
      <img src={logo} alt="" />
        <h1>Back End Management System</h1>
      </Link>
      </nav>
      <LeftNavMenu />

      </div>
    </div>
  )
}
