import { Button, Card, Input, Select,Icon, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useState,useEffect } from 'react'
import LinkButton from '../../components/header/link-button';
import { reqProducts, reqSearchProducts, reqUpdateProductStatus } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';
import { Link } from 'react-router-dom';

const { Option } = Select;

export default function ProductHome() {
  const[productData, setProductData] = useState([])
  const[pages, setPages] = useState(1)
  const[loading, setLoading] = useState(false)
  const[keyWord, setKeyWord] = useState('')
  const[searchType, setSearchType] = useState('productName')
  const[currentPageNum, setCurrentPageNum] = useState(0)

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',

    },
    {
      title: 'Description',
      dataIndex: 'desc',
  
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render:(price) => '$' + price
    },
    {
      width: 100,
      title: 'Status',
      render:(product) => {
        const {status,_id} = product
        //console.log(newStatus)
        return(
          <span>
            <Button type='primary' onClick={()=>updateStatus(_id, status)}>{status===1 ? 'Off the shelf': 'On the shelf'}</Button>
            <span>{status===1 ? 'selling': 'take down'}</span>
          </span>
        )
      }
    },
    {
      title: 'Operation',
      render:(product)=>{

        return(
          <span>
            <LinkButton>
            <Link to="detail" state={{product}}>Details</Link>
            </LinkButton>
            <LinkButton>Alter</LinkButton>
          </span>
        )
      }
  
    },
  ];


  useEffect(() => {
    getProducts(1)
  
  },[]

  )
 
  const getProducts = async(pageNum) => {
    setCurrentPageNum(pageNum)
    setLoading(true)

    let result
    if(keyWord){
       result = await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchKeyword:keyWord,searchType})
    }else{
      result = await reqProducts(pageNum,PAGE_SIZE)

    }

    setLoading(false)
    if(result.status===0){
      const {total,list} = result.data
      setProductData(list)
      setPages(total)
    } else{
      message.error('cant get the product info')
    }
  }

  const updateStatus = async(productId,status) => {
    const newStatus = status===1 ? 2 : 1
    const result = await reqUpdateProductStatus(productId,newStatus)
    if(result.status===0){
      message.success('status updated')
      getProducts(currentPageNum)
    }

  }

  const title = (
    <span >
      <Select value={searchType} style={{width:100}} onChange={value => setSearchType(value)}>
      <Option value='productName'>Name</Option>
      <Option value='productDesc'>Description</Option>
      </Select>
      <Input placeholder='key word' style={{width:150, margin: '0 0 0 10px'}} value={keyWord} onChange={e => setKeyWord(e.target.value)}/>
      <Button type='primary' onClick={() => getProducts(1)}>Search</Button>
      
    </span>
  )

  
  const extra = (
    <Button type='primary'>
       <PlusOutlined/> Add Product
      </Button>
  )
  return (
    <Card title={title} extra={extra}>
      <Table
        loading={loading}
        rowKey='_id'
        dataSource={productData} 
        columns={columns} 
        pagination={{
          defaultPageSize: PAGE_SIZE, 
          showQuickJumper: true, 
          total: pages, 
          onChange:getProducts
        }}/>;


    </Card>
  )
}
