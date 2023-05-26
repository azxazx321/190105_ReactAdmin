import React, { useEffect, useState } from 'react'
import { Card, Button, Table, message, Modal } from 'antd'
import { PlusOutlined, ArrowRightOutlined } from '@ant-design/icons';
import LinkButton from '../../components/header/link-button';
import { reqCategory, reqUpdateCategory,reqAddCategory } from '../../api';
import AddCategory from './add-category';
import UpdateCategory from './update-category';

export default function Category() {
  const[categories,setDataSource] = useState([])
  const[loading, setLoading] = useState(false)
  const[parentId,setParentId] = useState('0')
  const[parentName,setParentName] = useState('')
  const[subCategory,setSubCategory] = useState('')
  const[isModalVisible,setModelVisible] = useState(0)
  const[currentCategory,setcurrentCategory] = useState('')
  let newCategoryName = '' 
  let form
  const dataSource = [
    {
      parentId: "5e12b8bce31bb727e4b0e348",
      _id: "5fc30a1833fe4221c4546275",
      name: "冰箱",
      __v: 0
    },
    {
      parentId: "5e12b8bce31bb727e4b0e348",
      _id: "5fc30a4133fe4221c4546276",
      name: "微波炉",
      __v: 0
    },
    {
      parentId: "5e12b8bce31bb727e4b0e348",
      _id: "5fc30a4a33fe4221c4546277",
      name: "电饭煲",
      __v: 0
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Action',
      width: 400,
      render: (category) => (<span>
        <LinkButton onClick={() => showUpdate(category)}>update</LinkButton>
        { parentId === '0' ?
          <LinkButton onClick={() => showSubcategory(category)}>check subcategory</LinkButton>
          : null
        }
      </span>)
    
    }
  ];

  useEffect(() => {
    getCategories()
  
  },[parentId]

  )
 

  const showSubcategory = (category) => {
    setParentId(category._id)
    setParentName(category.name)
    //getCategories()

  }

  // async function getCategories(){
  //   const result = reqCategory('0')
  //   console.log('categoriesssss',result);
  //   if(result.status===0){
  //     const categories = result.data
  //     console.log('categories',categories);
  //     setDataSource({categories})
      
  //   }else{
  //     message.error('get category unsuccessfully')
  //   }
  // }

  const getCategories = async ()=> {
    setLoading(true)
    //parentId = newId || parentId
    const result = await reqCategory( parentId)
    if(result.status===0){
      const categories = result.data
      if(parentId === '0'){
      setDataSource(categories)
      }else{
        setSubCategory(
          categories
        )
      }
      setLoading(false)
    }else{
      message.error('get category unsuccessfully')
    }
  }

  const showCategory = () =>{
    setParentId('0')
    setParentName('')
    setSubCategory([])
  }

  const showAdd = () => {
    setModelVisible(1)
  }

  const showUpdate = (category) => {
    setcurrentCategory(category)
    console.log(category, currentCategory)
    setModelVisible(2)
  }

  const updateCategory =  () => {

    form.validateFields().then( async (value)=>{
      setModelVisible(0)
      console.log('value',value);
      const categoryId = currentCategory._id
      const {newCategory:newCategoryName} = value
      const result =  await reqUpdateCategory(categoryId, newCategoryName)
      if(result.status === 0){
        getCategories()

    }
    }).catch(err=>{
      console.log(err,'err')
    })
    
   

  }
  
  const addCategory  =  () => {

   
    form.validateFields().then(  async (value)=>{
      setModelVisible(0)
      console.log('value',value);
      console.log('addcategory',form.getFieldValue())

      const {category:categoryId,newCategory} = value
      form.resetFields()
      const result = await reqAddCategory(categoryId, newCategory)

    if(result.status === 0){
      if(categoryId===parentId){
        getCategories() 

      } 
    }  
  }  
    )
    .catch(
      err=>{
        console.log(err,'err')}

    )
    

  }

  const handleCancel = () => {
    form.resetFields()
    setModelVisible(0)
  }

  //getInputName自身无法调用，只能子组件调用
  const getInputName = (values) => {
    console.log('before',newCategoryName)
    newCategoryName = values
    console.log('after',newCategoryName)

  }

  const getForm = (addForm) => {
    form = addForm
  }


  const title = parentId === '0' ? "Category List" : (
      <span>
        <LinkButton onClick={showCategory}>Category List</LinkButton>
        <ArrowRightOutlined />
        <span style={{marginLeft: 5}}>{parentName}</span>
      </span>)
  const extra = <Button type='primary' onClick={showAdd}>
    <PlusOutlined/> Add
  </Button>

  return (
    <Card title={title} extra={extra} style={{width: 1800 }}>
      <Table 
        bordered={true}
        rowKey='_id'
        loading={loading}
        dataSource={parentId === '0' ? categories : subCategory} 
        columns={columns} 
        pagination={{defaultPageSize: 8, showQuickJumper: true}}
      />
      <Modal title="Add Category" visible={isModalVisible === 1} onOk={addCategory} onCancel={handleCancel}>
        <AddCategory categories={categories} parentId={parentId} getForm={getForm}/>
      </Modal>
      <Modal title="Update Category" visible={isModalVisible === 2} onOk={updateCategory} onCancel={handleCancel} getContainer={false} >
        <UpdateCategory categoryName={currentCategory.name} setForm={getInputName} getForm={getForm}/>
      </Modal>
    </Card>
  )
}
