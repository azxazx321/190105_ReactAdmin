import { Button, Card, Input, Select,Icon, Table } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react'
import LinkButton from '../../components/header/link-button';

const { Option } = Select;

export default function Product() {
  const[productData, setProductData] = useState([])
  const dataSource = [
    // {
    //   key: '1',
    //   name: 'Mike',
    //   age: 32,
    //   address: '10 Downing Street',
    // },
    // {
    //   key: '2',
    //   name: 'John',
    //   age: 42,
    //   address: '10 Downing Street',
    // },
    {
      "_id" : "5e12b97de31bb727e4b0e349", 
    "status" : 0, 
    "imgs" : [
        "1578588737108-index.jpg"
    ], 
      name : "Tests", 
    desc : "年度重量级新品，X390、T490全新登场 更加轻薄机身设计9", 
    price : 600, 
    pCategoryId : "5e12b8bce31bb727e4b0e348", 
    categoryId : "5fc74b650dd9b10798413162", 
    detail : "<p><span style=\"color: rgb(228,57,60);background-color: rgb(255,255,255);font-size: 12px;\">想你所需，超你所想！精致外观，轻薄便携带光驱，内置正版office杜绝盗版死机，全国联保两年！</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\">联想（Lenovo）扬天V110 15.6英寸家用轻薄便携商务办公手提笔记本电脑 定制【E2-9010/4G/128G固态】 2G独显 内置</span></p>\n<p><span style=\"color: rgb(102,102,102);background-color: rgb(255,255,255);font-size: 16px;\"></span></p>\n"
    }
  ];
  
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
        rowKey='_id'
        dataSource={dataSource} 
        columns={columns} />;

    </Card>
  )
}
