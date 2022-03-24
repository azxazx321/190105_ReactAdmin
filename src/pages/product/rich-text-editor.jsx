import React, { Component } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


export default class RichTextEditor extends Component {
  constructor(props){
    super(props)
    const html = this.props.details
    if(html){
      const contentBlock = htmlToDraft(html)
      if(contentBlock){
        
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
        const editorState = EditorState.createWithContent(contentState)
        this.state = {
          editorState
        }
      }
    }else{
      this.state = {
        editorState: EditorState.createEmpty(),
      }
    }
  }

  // state = {
  //   editorState: EditorState.createEmpty(),
  // }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  getDetails = () => {
    return draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
  }


  uploadImageCallBack = (file) => {
    return new Promise(
      (resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/manage/img/upload');
        //xhr.setRequestHeader('Authorization', 'Client-ID XXXXX');
        const data = new FormData();
        data.append('image', file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
          const response = JSON.parse(xhr.responseText);
          console.log('response',response.data.url)
          const {url} = response.data
          resolve({data: {link: url}});
        });
        xhr.addEventListener('error', () => {
          const error = JSON.parse(xhr.responseText);
          reject(error);
        });
      }
    );
  }

  render() {
    const { editorState } = this.state;
    //console.log(this.props)
    return (
        <div>
            <Editor
          editorState={editorState}
          editorStyle={{border: '1px solid black',minHeight:150 }}
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
      list: { inDropdown: true },
      textAlign: { inDropdown: true },
      link: { inDropdown: true },
      history: { inDropdown: true },
            image: { uploadCallback: this.uploadImageCallBack, alt: { present: true, mandatory: true } },
          }}
            />
        </div>
        
       
    );
  }
}