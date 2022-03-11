import { Button, Card, Input, Select,Icon, Table, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useState,useEffect } from 'react'
import LinkButton from '../../components/header/link-button';
import { reqProducts } from '../../api';
import { PAGE_SIZE } from '../../utils/constants';

const { Option } = Select;

export default function Product() {
  const[productData, setProductData] = useState([])
  const[pages, setPages] = useState(1)
  const[loading, setLoading] = useState(false)

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
      title: 'Status',
      dataIndex: 'status',
      render:(status) => {
        return(
          <span>
            <Button type='primary'>Sold</Button>
            <span>Selling</span>
          </span>
        )
      }
    },
    {
      title: 'Operation',
      render:()=>{
        return(
          <span>
            <LinkButton>Details</LinkButton>
            <LinkButton>Alter</LinkButton>
          </span>
        )
      }
  
    },
  ];

  useEffect(() => {
    getProducts()
  
  },[]

  )
 
  const getProducts = async(pageNumber) => {
    setLoading(true)
    const result = await reqProducts(pageNumber,PAGE_SIZE)
    setLoading(false)
    if(result.status===0){
      const {total,list} = result.data
      setProductData(list)
      setPages(total)
    } else{
      message.error('cant get the product info')
    }
  }

  const title = (
    <span >
      <Select style={{width:100}}>
      <Option value='0'>Name</Option>
      <Option value='1'>Id</Option>
      </Select>
      <Input placeholder='key word' style={{width:150, margin: '0 0 0 10px'}}/>
      <Button type='primary'>Search</Button>
      
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
