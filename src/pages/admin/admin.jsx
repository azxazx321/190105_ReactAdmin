import React from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Route, Routes,Navigate} from "react-router-dom";

export default function Admin() {
  const user = memoryUtils.user
  console.log('user :>> ',  user);
  // 如果用户为undefined 则返回login页面
  if (!user || !user._id){
    return(
      //v6 react-router-dom has removed <Redirect />
      <Routes>
          <Route path="*" element={<Navigate replace to="/login" />} />
      </Routes> )
      //console.log('admin');
  } 
  return (
    <div>
      Hello {user.username}
    </div>
  )
}
