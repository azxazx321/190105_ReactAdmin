import { Button, Card, message, Modal, Table } from 'antd'
import React, { useEffect, useState } from 'react'
import { reqAddRole, reqRoles } from '../../api'
import { PAGE_SIZE } from '../../utils/constants'
import AddForm from './add-form'
import AuthForm from './auth-form'


export default function Role() {
  const[roles, setRoles] = useState([])
  const[selectedRole, setSelRoles] = useState([]) 
  const[isModalVisible,setModelVisible] = useState(false)
  const[isModalAuth,setModelVisibleAuth] = useState(false)

  let form

  const getRoles = async () => {
    const result = await reqRoles()
    if(result.status===0){
        const roles = result.data
        setRoles(roles)
    }
  }

  const addRole = () => {
    form.validateFields().then(async (value)=>{
        if(value){
          setModelVisible(false)
          const {roleName} = value
          form.resetFields()

          const result = await reqAddRole(roleName)
          if(result.status === 0) {
            message.success('Create Roles successfully')
            const role = result.data
            console.log('addrole',roles)
            roles.push(role)
            setRoles(roles)
          } else {
            message.error('Craete role unsuccessfully')
          }
      }
    
    
      
    })
  }

  const updateRole = () => {
      //console.log(selectedRole.name)
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

  const getForm = (addForm) => {
    form = addForm
  }


  const title= (
    <span>
      <Button type='primary' onClick={() => setModelVisible(true)}>Create Roles</Button>
     
      <Button type='primary' disabled={!selectedRole._id} onClick={()=>setModelVisibleAuth(true)}>Roles access</Button>
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
        <Modal
          title='Create Role'
          visible={isModalVisible}
          onOk={addRole}
          onCancel={() => setModelVisible(false)}
        >
        <AddForm getForm={getForm}/>


        </Modal>

        <Modal
          title='Set Role Permisson'
          visible={isModalAuth}
          onOk={updateRole}
          onCancel={() => setModelVisibleAuth(false)}
        >
        <AuthForm role={selectedRole}/>


        </Modal>




      </Card>



  )
}
