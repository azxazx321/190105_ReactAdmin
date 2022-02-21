//left nevigation components
import React from 'react'
import logo from '../../assets/images/logo.png'
import './index.less'

export default function LeftNav() {
  return (
    <div className='left-nav'>
      <header className='left-nav-header'>
      <img src={logo} alt="" />
        <h1>Back End Management System</h1>

      </header>
      </div>
  )
}
