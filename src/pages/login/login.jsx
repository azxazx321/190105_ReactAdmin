import React from 'react'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from './images/logo.png'

export default function Login() {
  const onFinish = (values) => {
    console.log('Success:Ajax', values);
  };
  const onFinishFailed = (values) => {
    console.log('unSuccess:', values.values);
  };

  const validatePwd = (rule, value,callback) => {
      if(!value){
        callback("Password cannot be null")
      } else if (value.length < 4){
        callback("Your username must at least be 4 characters")
      } else if (value.length >12){
        callback("Your username must at least be 12 characters")
      } else if (!/^[A-z0-9_]+$/.test(value)){
        callback("Your username must be composed of characters, numbers or dash")
      } else {
        callback()
      }
  }

  return (
    <div className='login'> 
    <header className='login-header'>
      <img src={logo} alt="logo" />
      <h1>React project: Back-end Mangement System</h1>
    </header>
    <section className='login-content'>
      <h2>User Login</h2>
      <div>
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
            <Form.Item
              name="username"
              rules={[{ required: true, message: 'Please input your Username!' },
                {min:4, message:"Your username must at least be 6 characters"},
                {max:12, message:"Your username cannot more than 12 characters"},
                {pattern:/^[A-z0-9_]+$/, message:"Your username must be composed of characters, numbers or dash"}
            
            ]}
            >
              <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: 'Please input your Password!' },
              {
                validator: validatePwd
              }
            
            ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
              
            </Form.Item>
        </Form>
      </div>
    </section>

    </div>
  )
}