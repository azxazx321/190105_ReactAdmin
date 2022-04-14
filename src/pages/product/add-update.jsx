import { Card, Form, Input,Cascader, Upload, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { reqAddOrUppdateProduct, reqCategory } from '../../api';
import LinkButton from '../../components/header/link-button';
import PicturesWall from './pictures-wall'
import RichTextEditor from './rich-text-editor';



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
  let navigate = useNavigate()

  const [form] = Form.useForm(); 
  const [options, setOptions] = useState([]);
  const location = useLocation()
  const pw = React.createRef()
  const editor = React.createRef()
  let product = location.state || {}
  let isUpdate = !!location.state
  product = product.product || {}
  const{pCategoryId, categoryId} = product
  const categoryIds = []
  const list = ()=>{
    
    if(isUpdate){
      if(isUpdate){
        if(pCategoryId==='0'){
        categoryIds.push(categoryId)
    }else{
        categoryIds.push(pCategoryId)
        categoryIds.push(categoryId)
    }
    }
    }
    console.log(categoryIds)
    return categoryIds
  }
  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };
  const onFinish = async (values) => {
    const {productName:name,description:desc,price} = values
    console.log('producttttttt',values)
    let pCategoryId, categoryId
    if(categoryIds.length===1){
      pCategoryId = '0'
      categoryId = categoryIds[0]
    }else{
      pCategoryId = categoryIds[0]
      categoryId = categoryIds[1]
    }
    const imgs = pw.current.getImgs()
    const details = editor.current.getDetails()

    const newProduct = {
      name,
      desc,
      price,
      imgs,
      details,
      pCategoryId,
      categoryId
    }

    if(isUpdate){
      newProduct._id = product._id
      console.log('updateeeeeee',product._id)
    }

    console.log('producttttttt',newProduct)

    const results = await reqAddOrUppdateProduct(newProduct)
    if(results.status===0){
      message.success(`${isUpdate ?'update':'add'} product info successful`)
      navigate(-1)
    }else{
      message.error(`${isUpdate?'update':'add'} new product unsuccessful`)
    }
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

  const initOptions = async (categories) => {
    const options = categories.map(
      (category)=> ({
        value: category._id,
        label: category.name,
        isLeaf: false,
      })
    )
      const{pCategoryId,categoryId} = product
      if(isUpdate&&pCategoryId!=='0'){
        const subCategories = await getCategories(pCategoryId)
        console.log('subCategories',subCategories)
        const SubOptions = subCategories.map(
          (category)=> ({
            value: category._id,
            label: category.name,
            isLeaf: true,
          }))
        const targetOption = options.find(options => options.value === pCategoryId )
        targetOption.children = SubOptions
      }
        
    setOptions(options)
  }

  const getCategories = async (parentId) => {
    const result = await reqCategory(parentId)
    if(result.status===0){
      const categories = result.data
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
            <span>{isUpdate ? 'Update Product':'Add Product'}</span>
    </span>
  )
  return (
    <Card title={title}>
      <Form {...layout}
         onFinish={onFinish}
         onFinishFailed={onFinishFailed}
               
      >
        <Form.Item 
            initialValue={product.name}
            name="productName"
            label="Product name"
            rules={[{ required: true, message: 'Please input Product name!' }]}
            >
            <Input placeholder='Product name:' />
        </Form.Item>
        <Item 
            initialValue={product.desc}
            name="description"
            label="Product Description"
            rules={[{ required: true, message: 'Please input Product description!' }]}
            >
            <TextArea placeholder='Product Description' autoSize={{minRows:2}}></TextArea>  
        </Item>
        <Item 
            initialValue={product.price}
            name="price"
            label="Product price"
            rules={[{ required: true, message: 'Please input Product price!' },
            {validator: checkPrice}
          ]}
            >
            <Input placeholder='Product price:' type='number' suffix="$"/>
        </Item>
        <Item 
            initialValue={list()}
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
            name="pics"
            label="Pics"
           
            >
            <PicturesWall ref={pw} imgs={product.imgs}/>
        </Item>

        <Item 
            name="details"
            label="details"
            labelCol={{span:2}}
            wrapperCol={{span:10}}
            >
            <RichTextEditor ref={editor} details={product.detail}/>
        </Item>
        <Item 
            
            >
            <button type='primary' >Submit</button>
        </Item>
        </Form>
        
    </Card>
  )
}
