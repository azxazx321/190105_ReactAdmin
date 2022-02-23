import React, { Component, useState } from 'react'
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

// export default class LeftNavMenu extends Component {
//     state = {
//       collapsed: false,
//     };
  
//     toggleCollapsed = () => {
//       this.setState({
//         collapsed: !this.state.collapsed,
//       });
//     };

//     getMenuNodes_map = (menuList) =>{
//       return menuList.map(item =>{
//          if(!item.children){
//               return (
//               <Menu.Item key={item.key} icon={<ContainerOutlined />}>
//                  <Link to={item.key}>{item.title}</Link> 
//               </Menu.Item>)
           
//          }else {
//           return <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}> 
//                 {this.getMenuNodes_map(item.children)}
//           </SubMenu>
//         }
//       })
//     }

//     getMenuNodes = (menuList) => {
//       return menuList.reduce( (pre,item) => {
//         if(!item.children){
//            const newItem = (<Menu.Item key={item.key} icon={<ContainerOutlined />}>
//              <Link to={item.key}>{item.title}</Link> 
//           </Menu.Item>);
//           pre = [...pre,newItem]
//           //pre.push(newItem)
//         }else{
//           const newItem = (<SubMenu key={item.key} icon={<MailOutlined />} title={item.title}> 
//             {this.getMenuNodes(item.children)}
//       </SubMenu>)
//           // pre.push(
//           //   newItem
//           // )
//           pre = [...pre,newItem]

//         }
       

//         return pre
//       }
        
//         ,[])
//     }
  
//     render() {
//       return (
//         //Change width to adapt your style
//         <div style={{ width: 200 }}>
//           <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
//             {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
//           </Button>
//           <Menu
//             defaultSelectedKeys={['1']}
//             defaultOpenKeys={['sub1']}
//             mode="inline"
//             theme="dark"
//             inlineCollapsed={this.state.collapsed}
//           >
//             {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
//               <Link to="home">Index</Link>   
//             </Menu.Item>
//             <SubMenu key="sub2" icon={<MailOutlined />} title="Product">
//               <Menu.Item key="2">
//                   <Link to="home">option1</Link>     
//               </Menu.Item>
//               <Menu.Item key="3">Option 3</Menu.Item>
//               <Menu.Item key="4">Option 4</Menu.Item>
//               <Menu.Item key="5">Option 5</Menu.Item>
//             </SubMenu>
//             <Menu.Item key="6" icon={<ContainerOutlined />}>
//                   <Link to="user">User</Link>  
//             </Menu.Item> */}

//             {
//               this.getMenuNodes(menuList)
//             }
//             {/* <Menu.Item key="3" icon={<ContainerOutlined />}>
//               User
//             </Menu.Item>
//             <Menu.Item key="4" icon={<ContainerOutlined />}>
//               Role
//             </Menu.Item>
//             <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
//               <Menu.Item key="5">Option 5</Menu.Item>
//               <Menu.Item key="6">Option 6</Menu.Item>
//               <Menu.Item key="7">Option 7</Menu.Item>
//               <Menu.Item key="8">Option 8</Menu.Item>
//             </SubMenu> */}
            
//           </Menu>
//         </div>
//       );
//     }
//   }

  
  export default function LeftNavMenu() {
    const [collapsed,setCollapsed ] = useState(false)
    let location = useLocation();
    //const {pathname} = location.state;
    
    //const constant不允许修改 var or let
    let pathname = 'home';
   
    // state = {
    //   collapsed: false,
    // };
  

    // function toggleCollapsed(){
     
    //     setCollapsed(
    //        !collapsed
    //     )
    // }

      function toggleCollapsed(){
        setCollapsed(!collapsed)
    }

    function getPathName(){
      
      if(!location.state){
          return pathname = 'home'
      }else{
        console.log('pathname:>>>>>>> ',location.state.pathname);
        return pathname = location.state.pathname
      }
    }

    

      //等价上面的写法  https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/Arrow_functions
    // const toggleCollapsed = () => setCollapsed(!collapsed)

    // toggleCollapsed = () => {
    //   this.setState({
    //     collapsed: !this.state.collapsed,
    //   });
    // };

      const getMenuNodes = (menuList) => {
            return menuList.reduce( (pre,item) => {
              if(!item.children){
                 const newItem = (<Menu.Item key={item.key} icon={<ContainerOutlined />}>
                   {/* Link 里面可以利用state将pathname传递给location的state，然后用useLocation 取出*/}
                   <Link to={item.key} state={{pathname: item.key}}>{item.title}</Link> 
                </Menu.Item>);
                pre = [...pre,newItem]
                //pre.push(newItem)
              }else {
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



//     getMenuNodes_map = (menuList) =>{
//       return menuList.map(item =>{
//          if(!item.children){
//               return (
//               <Menu.Item key={item.key} icon={<ContainerOutlined />}>
//                  <Link to={item.key}>{item.title}</Link> 
//               </Menu.Item>)
           
//          }else {
//           return <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}> 
//                 {this.getMenuNodes_map(item.children)}
//           </SubMenu>
//         }
//       })
//     }
    return (
      <div style={{ width: 200 }}>
          {/* 只要调用函数进行执行，都必须加括号。此处加了括号，可能就为固定值，所以不加 */}
          <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            defaultSelectedKeys={['home']} //初始选中的菜单项 key 数组	
            selectedKeys={getPathName()} //当前选中的菜单项 key 数组	
            defaultOpenKeys={[]} //初始展开的 SubMenu 菜单项 key 数组	
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
