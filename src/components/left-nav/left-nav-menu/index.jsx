import React, { Component } from 'react'
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
import { Link } from 'react-router-dom';
import menuList from '../../../config/menuConfig';

const { SubMenu } = Menu;

export default class LeftNavMenu extends Component {
    state = {
      collapsed: false,
    };
  
    toggleCollapsed = () => {
      this.setState({
        collapsed: !this.state.collapsed,
      });
    };

    getMenuNodes_map = (menuList) =>{
      return menuList.map(item =>{
         if(!item.children){
              return (
              <Menu.Item key={item.key} icon={<ContainerOutlined />}>
                 <Link to={item.key}>{item.title}</Link> 
              </Menu.Item>)
           
         }else {
          return <SubMenu key={item.key} icon={<MailOutlined />} title={item.title}> 
                {this.getMenuNodes_map(item.children)}
          </SubMenu>
        }
      })
    }
  
    render() {
      return (
        //Change width to adapt your style
        <div style={{ width: 200 }}>
          <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
          </Button>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={this.state.collapsed}
          >
            {/* <Menu.Item key="1" icon={<PieChartOutlined />}>
              <Link to="home">Index</Link>   
            </Menu.Item>
            <SubMenu key="sub2" icon={<MailOutlined />} title="Product">
              <Menu.Item key="2">
                  <Link to="home">option1</Link>     
              </Menu.Item>
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
              <Menu.Item key="5">Option 5</Menu.Item>
            </SubMenu>
            <Menu.Item key="6" icon={<ContainerOutlined />}>
                  <Link to="user">User</Link>  
            </Menu.Item> */}

            {
              this.getMenuNodes_map(menuList)
            }
            {/* <Menu.Item key="3" icon={<ContainerOutlined />}>
              User
            </Menu.Item>
            <Menu.Item key="4" icon={<ContainerOutlined />}>
              Role
            </Menu.Item>
            <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
              <Menu.Item key="5">Option 5</Menu.Item>
              <Menu.Item key="6">Option 6</Menu.Item>
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu> */}
            
          </Menu>
        </div>
      );
    }
  }
