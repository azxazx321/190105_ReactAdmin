import React from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Route, Routes,Navigate} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';


const { Footer, Sider, Content } = Layout;

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
      <Layout style={{height:"100%"}}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
          <Header></Header>
       
        <Content >Content</Content>
        <Footer 
            style={{backgroundColor:"grey",textAlign:'center', color:'#cccccc'}}

        >
          Footer
          </Footer>
      </Layout>
    </Layout>
  )
}
