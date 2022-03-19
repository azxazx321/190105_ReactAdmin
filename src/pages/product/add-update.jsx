import { Card, Form, Input,Cascader, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import LinkButton from '../../components/header/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { reqCategory } from '../../api';


const {Item} = Form
const { TextArea } = Input;

const option = [
  {
    code: 'zhejiang',
    name: 'Zhejiang',
    items: [
      {
        code: 'hangzhou',
        name: 'Hangzhou',
        items: [
          {
            code: 'xihu',
            name: 'West Lake',
          },
        ],
      },
    ],
  },
  {
    code: 'jiangsu',
    name: 'Jiangsu',
    items: [
      {
        code: 'nanjing',
        name: 'Nanjing',
        items: [
          // {
          //   code: 'zhonghuamen',
          //   name: 'Zhong Hua Men',
          // },
        ],
      },
    ],
  },
];
const layout = {
  labelCol: { span:2},
  wrapperCol: { span: 4 },
};

export default function ProductAddUpdate() {
  const [form] = Form.useForm(); 
  const[options, setOptions] = useState([])
  const onFinish = (values) => {
    console.log('Success:', values.productName);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const checkPrice = (_,value) => {
      if(value > 0){
        return Promise.resolve()

      }
      return Promise.reject(new Error('Price must be greater than zero!'))
  }

  const initOptions = (categories) => {
    const options = categories.map(
      (category)=> ({
        code: category._id,
        name: category.name,
        item:[]
      })
    )
      setOptions(options)

  }

  const getCategories = async (parentId) => {
    const result = await reqCategory(parentId)
    if(result.status===0){
      const categories = result.data
      initOptions(categories)

    }
  }

  useEffect(()=>{
    getCategories()
  },[])
  const title = (
    <span>
    <LinkButton>
          <Link to='home'>
          <ArrowLeftOutlined style={{color: 'green', marginRight: 15, fontSize: 20}}/>
          </Link>
          </LinkButton>     
            <span>Add Product</span>
    </span>
  )
  return (
    <Card title={title}>
      <Form {...layout}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
               
      >
        <Form.Item 
            name="productName"
            label="Product name"
            rules={[{ required: true, message: 'Please input Product name!' }]}
            >
            <Input placeholder='Product name:' />
        </Form.Item>
        <Item 
           name="description"
            label="Product Description"
            rules={[{ required: true, message: 'Please input Product description!' }]}
            >
            <TextArea placeholder='Product Description' autoSize={{minRows:2}}></TextArea>  
        </Item>
        <Item 
            name="price"
            label="Product price"
            rules={[{ required: true, message: 'Please input Product price!' },
            {validator: checkPrice}
          ]}
            >
            <Input placeholder='Product price:' type='number' suffix="$"/>
        </Item>
        <Item 
            name="category"
            label="Product category"
            rules={[{ required: true, message: 'Please input Product category!' }]}
            >
            <Cascader
                fieldNames={{ label: 'name', value: 'code', children: 'items' }}
                options={options}
                placeholder="Please select"
              />
        </Item>
        <Item 
            name="price2"
            label="Product name"
            rules={[{ required: true, message: 'Please input Product name!' }]}
            >
            <Input placeholder='Product name:' />
        </Item>
        <Item 
            
            >
            <button type='primary' >Submit</button>
        </Item>
        </Form>
        
    </Card>
  )
}
