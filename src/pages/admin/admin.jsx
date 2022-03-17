import React from 'react'
import memoryUtils from '../../utils/memoryUtils'
import { Route, Routes,Navigate, BrowserRouter} from "react-router-dom";
import { Layout } from 'antd';
import LeftNav from '../../components/left-nav';
import Header from '../../components/header';
import Home from '../home/home';
import Product from '../product/product';
import User from '../user/user';
import Role from '../role/role';
import Category from '../category/category';
import Line from '../charts/line';
import Bar from '../charts/bar';
import Pie from '../charts/pie';

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
            </Routes>
         
      )
      //console.log('admin');
  } 
  return (
      <Layout style={{height:"100%"}}>
      <Sider>
        <LeftNav />
      </Sider>
      <Layout>
          <Header></Header>
       
        <Content style={{margin: 20, backgroundColor: '#fff'}}>
        <Routes>
          <Route path="home" element={<Home />}/>
          <Route path="product/*" element={<Product />}/>
          <Route path="user" element={<User />}/>
          <Route path="role" element={<Role />}/>
          <Route path="category" element={<Category />}/>
          <Route path="line" element={<Line />}/>
          <Route path="Bar" element={<Bar />}/>
          <Route path="Pie" element={<Pie />}/>
        </Routes>
          {/* <Routes>
           
                <Route index element={<Home />} />
                <Route path="product" element={<Product />}/>
                <Route path="home" element={<Home />} />
                <Route path="user" element={<User />} />
                <Route path="Role" element={<Role />} />
      </Routes> */}
         
        </Content>
        <Footer 
            style={{backgroundColor:"grey",textAlign:'center', color:'#cccccc'}}

        >
          Footer
          </Footer>
      </Layout>
    </Layout>
  )
}
