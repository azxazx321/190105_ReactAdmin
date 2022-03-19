import { Card, List } from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import LinkButton from '../../components/header/link-button';
import { Link, useLocation } from 'react-router-dom';
import { BASE_IMG_URL } from '../../utils/constants';
import { reqSingleCategory } from '../../api';


export default function Detail() {
    const[cName1, setCName1] = useState('')
    const[cName2, setCName2] = useState('')

    const {product} = useLocation().state;
    const {name,desc,price,detail,imgs} = product

    useEffect(async ()=>{
      const {pCategoryId,categoryId} = product
      console.log('pCategoryId',pCategoryId)
      if(pCategoryId === '0'){
        const result = await reqSingleCategory(categoryId)
        const cName1 = result.data.name
        console.log('cName1')
        setCName1(cName1)
      } else {
        const results = await Promise.all([reqSingleCategory(pCategoryId), reqSingleCategory(categoryId)])
        // const result1 = await reqSingleCategory(pCategoryId)
        // const result2 = await reqSingleCategory(categoryId)
        const cName1 = results[0].data.name
        const cName2 = results[1].data.name
        setCName1(cName1)
        setCName2(cName2)
      }
    },[product])

    const title = (
        <span>
          <LinkButton>
          <Link to='home'>
          <ArrowLeftOutlined style={{color: 'green', marginRight: 15, fontSize: 20}}/>
          </Link>
          </LinkButton>     
            <span>Details</span>
        </span>
    )
  return (
    <Card title={title} className='product-detail'> 
        <List>
              <List.Item>
                  <span className='left'>
                  Product Name:
                  </span>
                  <span>{name}</span>
              </List.Item>
              <List.Item>
                  <span className='left'>
                  Product Price:
                  </span>
                  <span>{price}</span>
              </List.Item>
              <List.Item>
              <span className='left'>Product DESC:</span>
                <span>desc:{desc}</span>
              </List.Item>
              <List.Item>
              <span className='left'>Category:</span>
                <span>{cName1}  {cName2 ? '--->' + cName2 : null }</span>
              </List.Item>
              <List.Item>
                <span>Pics</span>
                <span>{imgs.map(img => (
                  <img key={img} className='product-img' src={BASE_IMG_URL + img} alt="img" />

                ))}</span>
                <img className='product-img' src='.' alt="img" />
                
              </List.Item>
              <List.Item>
              <span className='left'>Product Detail:</span>
                <span dangerouslySetInnerHTML={{__html: detail}}>

                </span>
              </List.Item>

        </List>
        </Card>
  )
}
