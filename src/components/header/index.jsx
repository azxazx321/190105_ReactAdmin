import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Modal, Button } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import {formateDate} from '../../utils/dataUtils'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api/index'
import './index.less'
import menuList from '../../config/menuConfig'
import storageUtil from '../../utils/storageUtil';
import LinkButton from './link-button';


export default function Header() {
  const { confirm } = Modal;
  const[currentTime, setCurrentTime] = useState(formateDate(Date.now()))
  const[weather, setWeather] = useState('4243')
  const {username} = memoryUtils.user
  let location = useLocation();
  let navigate = useNavigate();
  let currentpath = location.pathname
  //const title = getTitle(currentpath)
  //console.log('location in header',path)


  const updateTime = ()=>{ const timeId = setInterval(() => {
    //const currentTime = formateDate(Date.now)
    setCurrentTime(
      formateDate(Date.now())
    )
  }, 1000)
  return timeId

  }

  const getWeather = async () => {
    const { weather } = await reqWeather(37,144)
    setWeather(
      weather
    )
  }
  
  const getTitle = (currentPath) => {
    //return currentPath
     let title
     //console.log('object :>> ');
    menuList.forEach( item => {
     //console.log('item :>> ', item);
       if( item.key === currentPath ){
         title = item.title
       } else if( item.children ){
        const childItem = item.children.find(childItem => childItem.key === currentPath)
        if (childItem){
          title = childItem.title
        }
       }
     })
     return title
  }

  const logout = () => {
    confirm({
      title: 'Do you Want to log out?',
      icon: <ExclamationCircleOutlined />,
      content: 'admin',
      onOk() {
        console.log('OK');
        storageUtil.removeUser()
        memoryUtils.user = {}
        navigate('/login')
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  useEffect( () => {
    const timeId = updateTime()
    console.log('timeid',timeId);
    getWeather()
    return () => {
      clearInterval(timeId)
      console.log('clear :>> ');
    }
   
  },[])

  function showConfirm() {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'admin',
      onOk() {
        console.log('OK');

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }


  return (
    <div className='header'>
      
        <div className='header-top'>
          <span>Hi,{username}</span>
          <LinkButton onClick={logout}>quit</LinkButton>
          </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{getTitle(currentpath)}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src="" alt="" />
             <span>{weather}</span>
          </div>
        </div>
      
    </div>
  )
}
