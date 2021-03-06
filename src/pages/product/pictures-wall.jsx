import React from 'react'
import { Upload, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { reqDeleteImg } from '../../api';
import { BASE_IMG_URL } from '../../utils/constants';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}



export default class PicturesWall extends React.Component {
  constructor(props){
    super(props)
    let fileList = []
    const {imgs} = this.props
    console.log('first',imgs)
    if(imgs && imgs.length>0){
      fileList = imgs.map((img,index) => ({
        uid: -index,
        name:img ,
        status:'done',
        url:BASE_IMG_URL + img
      })
      )
    }

    this.state = {
      previewImage: '',
      previewVisible: false,
      fileList
    }
  }

  state = {
    previewVisible: false,
    previewImage: '',
    previewTitle: '',
    fileList: []
  };


  handleCancel = () => this.setState({ previewVisible: false });

  getImgs = () => this.state.fileList.map(file => file.name)

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
    });
  };

  handleChange = async ({ file,fileList }) =>{ 
      console.log(file.status,fileList)
      if(file.status==='done'){
          const result = file.response
          if(result.status===0){
             message.success('upload successfully') 
             const {name,url}= result.data
             console.log(name,url)
             const newFile = fileList[fileList.length - 1]
             newFile.name = name
             newFile.url = url
          }else{
              message.error('upload unsuccessfully')
          }
      } else if (file.status ==='removed'){
        
        const result = await reqDeleteImg(file.name)
        console.log(file.name)
        console.log('resultttttttt',result)
        if(result.status===0){
          message.success('deleted pics')
        }else {
          message.error('deleted pics unsuccesffully')
        }
      }
      this.setState({ fileList })};

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          accept='image/*'
          name='image'
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </>
    );
  }
}