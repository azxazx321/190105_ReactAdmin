import React from 'react'
import { Form, Input} from 'antd';


const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  /* eslint-disable no-template-curly-in-string */
  
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };
  /* eslint-enable no-template-curly-in-string */
  

export default function UpdateCategory(props) {
    const [form] = Form.useForm();
    props.getForm(form)

    const onFinish = (values) => {
        console.log(values);
  
        };
      
    // useEffect(()=>{
    // },
    // [])

    const onChange = () => {
      console.log('onchange',form.getFieldValue())
      //props.setForm(e.target.value)
      
    }
      

    return (
       
        <Form {...layout} name="nest-messages"  form={form}>
        
        
        <Form.Item
            name='newCategory'
            label="New Category"
            initialValue=''
            onChange={onChange}
            rules={[
            {
                required: true,
            },
            ]}
        >
            <Input placeholder={props.categoryName} />
        </Form.Item>
        
       
        
       
        </Form>

        
    )
}
