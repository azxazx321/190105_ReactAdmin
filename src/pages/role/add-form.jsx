import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Button } from 'antd';


const { Option } = Select;

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


export default function AddForm(props) {
  const [form] = Form.useForm();
  props.getForm(form)
  const {parentId,categories} = props


    function handleChange() {
      console.log('form',form.getFieldsValue()
      //props.setForm(e.target.value)
      )
    }

    useEffect(()=>{
      form.setFieldsValue({
        category: parentId,
      });
    },[props])

        

    return (
        <Form {...layout} name="nest-messages" form={form} validateMessages={validateMessages}>
        
       
        <Form.Item
            name='roleName'
            label="New Role"
            initialValue=''
            onChange={handleChange}
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        
       
        
        
        </Form>

        
    )
}
