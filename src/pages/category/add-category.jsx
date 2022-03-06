import React from 'react'
import { Form, Input, Select, Button } from 'antd';

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
  

export default function AddCategory() {
    const onFinish = (values) => {
        console.log(values);
        };

    return (
        // <Form>
        //     <Item>
        //     <Select>
        //         <Option value='0'>ggfdgdsf</Option>
        //     </Select>
        //     </Item>
        //     <Item><Input placeholder='????'/></Item>
            
        // </Form>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
        
        <Form.Item
            name='category'
            label="Category"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Select
        style={{ }}
        
      >
        <Option value="rmb">RMB</Option>
        <Option value="dollar">Dollar</Option>
      </Select>
        </Form.Item>
        <Form.Item
            name='newCategory'
            label="New Category"
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input />
        </Form.Item>
        
       
        
        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
            Submit
            </Button>
        </Form.Item>
        </Form>

        
    )
}
