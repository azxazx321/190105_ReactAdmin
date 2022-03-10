import React, { useEffect, useState } from 'react'
import { Form, Input, Select, Button } from 'antd';
import PropTypes from 'prop-types'
import { render } from 'less';

const { Option } = Select;

const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!!!'
   
  };


export default function AddCategory(props) {
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
            name='category'
            label="Category"
            initialValue= '0'
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Select >
              <Option value='0'>1 category</Option>
            {
                categories.map(
                  (category) => (<Option value={category._id}>
                          {category.name}
                        </Option>)
                  
                )
            }
          </Select>
        </Form.Item>
        <Form.Item
            name='newCategory'
            label="New Category"
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
