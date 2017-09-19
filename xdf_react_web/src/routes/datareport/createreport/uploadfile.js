import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message } from 'antd';
import styles from './uploadfile.less'
const Dragger = Upload.Dragger;

export default class FilesWall extends React.Component {
    state = {
        fileList: [],
        filepath:[]
    }

    beforeUpload = (file) => {
        //  console.log(file.type);
        const isFile = (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ==='application/pdf' || file.type === 'application/msword');
        if (!isFile) {
          message.error('只能上传doc,docx和pdf格式的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('图片大小不能超过2MB!');
        }
        const isThree = this.state.fileList.length < 3; 
        if (!isThree) {
          message.error('上传数量已超过上限!');
        }
        return isFile && isLt2M && isThree;
      }

      handleChange = ({ fileList,file }) => {
        let filepath=[];
          for(let item of fileList){
              if(item.status==='done'&&item.response&&item.response.code===200){
                filepath.push(item.response.filepath);
              }
          }
        this.setState({ fileList,filepath })
        if(file.status==='done'||file.status==='removed'){
            this.props.onSuccess(this.state.filepath);
        }
      }
      handleRemove = (file) => {
          this.props.onRemoveFile(file.response.filepath);
      }
    render(){
        const { fileList } = this.state;
        return (
            <div   className={styles.dragcontent}>
            <Dragger 
            name="file" 
            multiple={false} 
            showUploadList={true}
            action="/node/api/researchfile"
            fileList={fileList}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
           
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或者拖动文件到此区域上传</p>
              <p className="ant-upload-hint">仅支持上传word和pdf文件(.doc,.docx,.pdf)</p>
            </Dragger>
          </div>
        );
    }
}
