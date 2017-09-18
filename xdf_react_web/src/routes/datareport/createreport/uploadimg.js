import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, Modal,message } from 'antd';

export default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    imgpath:[]
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }
 beforeUpload = (file) => {
    //  console.log(file.type);
    const isJPG = (file.type === 'image/jpeg'|| file.type === 'image/png');
    // file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ==='application/pdf' || file.type === 'application/msword'
    if (!isJPG) {
      message.error('只能上传jpg和png格式的文件!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过2MB!');
    }
    return isJPG && isLt2M;
  }

  handleChange = ({ fileList,file }) => {
    let imgpath=[];
      for(let item of fileList){
          if(item.status==='done'&&item.response&&item.response.code===200){
            imgpath.push(item.response.filepath);
          }
      }
    this.setState({ fileList,imgpath })
    if(file.status==='done'||file.status==='removed'){
        this.props.onSuccess(this.state.imgpath);
    }
  }
  handleRemove = (file) => {
      this.props.onRemoveImg(file.response.filepath);
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          withCredentials
          action="/node/api/researchfile"
          listType="picture-card"
          fileList={fileList}
          beforeUpload={this.beforeUpload}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}