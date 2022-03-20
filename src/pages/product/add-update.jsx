import { Card, Form, Input,Cascader, Upload } from 'antd'
import React, { useEffect, useState } from 'react'
import LinkButton from '../../components/header/link-button';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { reqCategory } from '../../api';
import { options } from 'less';


const {Item} = Form
const { TextArea } = Input;

// const optionLists = [
//   {
//     value: 'zhejiang',
//     label: 'Zhejiang',
//     isLeaf: false,
//   },
//   {
//     value: 'jiangsu',
//     label: 'Jiangsu',
//     isLeaf: false,
//   },
// ];

const layout = {
  labelCol: { span:2},
  wrapperCol: { span: 4 },
};

export default function ProductAddUpdate() {
  const [form] = Form.useForm(); 
  const [options, setOptions] = useState([]);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onFinish = (values) => {
    console.log('Success:', values);
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
  
  const loadData = async selectedOptions => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;

    const subCategories = await getCategories(targetOption.value)
    if(subCategories && subCategories.length > 0){
      const options = subCategories.map(
        (category)=> ({
          value: category._id,
          label: category.name,
          isLeaf: true,
        })
      )
      targetOption.children = options

    }else{
      targetOption.isLeaf = true
    }
    
    setOptions([...options])
  }

  const initOptions = (categories) => {
    const options = categories.map(
      (category)=> ({
        value: category._id,
        label: category.name,
        isLeaf: false,
      })
    )
    setOptions(options)
  }

  const getCategories = async (parentId) => {
    const result = await reqCategory(parentId)
    if(result.status===0){
      const categories = result.data
      console.log(parentId)
      if(parentId==='0'){
        initOptions(categories)
      }else{
        return categories
      }

    }
  }

  useEffect(()=>{
    getCategories('0')
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
                
                options={options}
                loadData={loadData}
                placeholder="Please select"
                changeOnSelect 
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
