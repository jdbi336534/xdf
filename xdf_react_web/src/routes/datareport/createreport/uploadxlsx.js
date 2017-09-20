import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Upload, Icon, message } from 'antd';
const Dragger = Upload.Dragger;

export default class ExcelWall extends React.Component {
    state = {
        fileList: [],
    }

    beforeUpload = (file) => {
        //  console.log(file.type);
        const isFile = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        if (!isFile) {
          message.error('上传文件的格式错误，只能上传excel文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('文件大小不能超过2MB!');
        }
        const isThree = this.state.fileList.length < 1; 
        if (!isThree) {
          message.error('上传数量已超过上限，请删除上传的文件列表后再继续!');
        }
        return isFile && isLt2M && isThree;
      }

      handleChange = ({ fileList,file }) => {
        this.setState({ fileList })
        if(file.status==='done'){
            this.props.onSuccess(file.response);
        }
      }
      handleRemove = (file) => {
          this.props.onRemove(file.response.filepath);
      }
    render(){
        const { fileList } = this.state;
        return (
            <div>
            <Dragger 
            name="file" 
            multiple={false} 
            showUploadList={true}
            action="/node/api/course"
            fileList={fileList}
            beforeUpload={this.beforeUpload}
            onChange={this.handleChange}
            onRemove={this.handleRemove}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或者拖动文件到此区域上传</p>
              <p className="ant-upload-hint">仅支持上传Excel文件(.xlsx)</p>
            </Dragger>
          </div>
        );
    }
}
