import { Button, Card, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { reqRoles } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'



export default function Role() {
  const[roles, setRoles] = useState([])
  const[selectedRole, setSelRoles] = useState([]) 

  const getRoles = async () => {
    const result = await reqRoles()
    if(result.status===0){
        const roles = result.data
        setRoles(roles)
    }
  }

  useEffect(()=>{
    getRoles()
  },[])

  const  columns =[
      {
        title: 'Role',
        dataIndex: 'name',
      
      },
      {
        title: 'Created time',
        dataIndex: 'create_time',
      
      },
      {
        title: 'authorized time',
        dataIndex: 'auth_time',
     
      }
      , {
        title: 'author',
        dataIndex: 'auth_name',
       
      }
    ]
  
  const onRow = (role) => {
    return{
      onClick: event => {
        setSelRoles(role)
      }
    }
  }

  const title= (
    <span>
      <Button type='primary'>Create Roles</Button>
     
      <Button type='primary' disabled={!selectedRole._id}>Roles access</Button>
    </span>
  )

  return (
    <Card title={title} >
      <Table 
        bordered
        rowKey='_id'
        columns={columns} 
        dataSource={roles}
        pagination={{defaultPageSize: PAGE_SIZE}}
        rowSelection={{type:'radio', selectedRowKeys:[selectedRole._id]}}
        onRow={onRow}
        />
      </Card>
  )
}
