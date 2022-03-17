import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Detail from './detail'
import ProductHome from './home'
import ProductAddUpdate from './add-update'
import './product.less'

export default function Product() {
  return (
    <Routes>
      <Route index element={<ProductHome/>}/>
      <Route path='detail' element={<Detail/>}/>
      <Route path='addupdate' element={<ProductAddUpdate/>}/>
      <Route path='*' element={<ProductHome/>}/>
    </Routes>
  )
}
