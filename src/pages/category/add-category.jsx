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


export default function AddCategory(props) {
  const [form] = Form.useForm();
  props.getForm(form)


  //   PropTypes = {
  //     categories: PropTypes.array.isRequired
  //  }
    const {parentId,categories} = props
    //const[defaultParentId,setDefaultParentId] = useState('')

    const onFinish = (values) => {
        console.log(values);
        };

    function handleChange(e) {
      console.log(e.target.value);
      //props.setForm(e.target.value)
      props.getForm(form)
      console.log('form',form.getFieldsValue());
    }

    useEffect(()=>{
      form.setFieldsValue({
        category: parentId,
      });
      //console.log('useEffect parentId',parentId);
    },[props])

        

    return (
        <Form {...layout} name="nest-messages" onFinish={onFinish} form={form}>
        
        <Form.Item shouldUpdate
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
