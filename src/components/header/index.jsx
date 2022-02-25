import React from 'react'
import './index.less'

export default function Header() {
  return (
    <div className='header'>
      
        <div className='header-top'>
          <span>Hi,Admin</span>
          <button>Quit</button>
          </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>Index</div>
          <div className='header-bottom-right'>
            <span>29348930243029</span>
            <img src="" alt="" />
             <span>Clear</span>
          </div>
        </div>
      
    </div>
  )
}
