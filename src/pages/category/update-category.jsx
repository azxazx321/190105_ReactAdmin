import React, { useEffect } from 'react'
import { Form, Input, Select, Button } from 'antd';


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
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  

export default function UpdateCategory(props) {

    const onFinish = (values) => {
        console.log(values);
        props.setForm(values)
        };
      
      

    return (
       
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        
        
        <Form.Item
            name='newCategory'
            label="New Category"
            initialValue=''
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input placeholder={props.categoryName}/>
        </Form.Item>
        
       
        
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>

        
    )
}
