import React, { useEffect, useState } from 'react'
import { Form, Input, Tree, Button } from 'antd';



const layout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!!!'
   
  };


export default function AuthForm(props) {

  
  const {role} = props


   

    useEffect(()=>{
      console.log(props.role.name)
    },[props])

        

    return (
        <Form {...layout} name="nest-messages"  validateMessages={validateMessages}>
        
       
        <Form.Item
            
            label="Role Name"
            
        >
            <Input value={role.name}  disabled/>
        </Form.Item>
        

        
        
        </Form>

        
    )
}

