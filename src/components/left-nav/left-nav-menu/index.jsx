import React, { Component, useEffect, useState, useLayoutEffect} from 'react'
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { Link, useLocation,useParams,useSearchParams  } from 'react-router-dom';
import menuList from '../../../config/menuConfig';

const { SubMenu } = Menu;


  export default function LeftNavMenu() {
    const [collapsed,setCollapsed ] = useState(false)
    //const [nodes, setNode] = useState()
    let location = useLocation();
    console.log('111 :>> ',location);
    let currentPathname = location.pathname

    
    //const useComponentWillMount = () => getMenuNodes(menuList)

    const getMenuNodes = (menuList) => {
      
      return menuList.reduce( (pre,item) => {
        if(!item.children){
           const newItem = (<Menu.Item key={item.key} icon={<ContainerOutlined />}>
             {/* Link 里面可以利用state将pathname传递给location的state，然后用useLocation 取出*/}
             <Link to={item.key} >{item.title}</Link> 
          </Menu.Item>);
          pre = [...pre,newItem]
          //pre.push(newItem)
        }else {
          //console.log('getsubMunuNode!!!!!',item.key)
          const newItem = (<SubMenu key={item.key} icon={<MailOutlined />} title={item.title}> 
            {getMenuNodes(item.children)}
      </SubMenu>)
          // pre.push(
          //   newItem
          // )
          pre = [...pre,newItem]
         
        }
                return pre
              }
                
                ,[])
            }

      function getOpenKey(){
        let openKey =''

        return menuList.map( (item) => {
          if(!item.children){
            openKey=''
          }else {
            if(item.children.find(childItem => currentPathname.indexOf(childItem.key) === 0)){     
                  openKey = item.key
             
            }
          }
          return openKey
          }
                  
                )
      }

      function toggleCollapsed(){
        setCollapsed(!collapsed)
    }

   
    return (
      <div style={{ width: 200 }}>
        
          {/* 只要调用函数进行执行，都必须加括号。此处加了括号，可能就为固定值，所以不加 */}
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            defaultSelectedKeys={['home']} //初始选中的菜单项 key 数组	
            selectedKeys={currentPathname} //当前选中的菜单项 key 数组	
            defaultOpenKeys={getOpenKey()} //初始展开的 SubMenu 菜单项 key 数组	
            mode="inline"
            theme="dark"
            // inlineCollapsed={collapsed}
          >

            {
            getMenuNodes(menuList)
            }
                </Menu>
        </div>
    )
  }
