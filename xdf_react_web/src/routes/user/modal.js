import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, Modal, Select } from 'antd'

const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}


const modal = ({
  subject,
  item:{},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {

    const subjectOptions=subject.map((item,key)=>{
        return(
         <Option key={key} value={item.subject}>{item.subject}</Option>
       );
    });


  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue()
      }
      onOk(data);
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="姓名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: item.name,
            rules: [
              {
                required: true,
                pattern: /^[\u4e00-\u9fa5_a-zA-Z_]{0,10}$/,
                message: '请输入正确的姓名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="用户名" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
                pattern: /^[a-z_]{0,10}$/,
                message: '请输入正确的用户名!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="邮箱" hasFeedback {...formItemLayout}>
          {getFieldDecorator('email', {
            initialValue: item.email,
            rules: [
              {
                required: true,
                pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                message: '请输入正确的E-mail地址!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="学科组" hasFeedback {...formItemLayout}>
          {getFieldDecorator('subject', {
            initialValue: item.subject,
            rules: [
              {
                required: true
              },
            ],
          })(
        <Select  placeholder="请选择学科组">
            {subjectOptions}
        </Select>
          )}
        </FormItem>
        <FormItem label="职位" hasFeedback {...formItemLayout}>
          {getFieldDecorator('role', {
            initialValue: item.role,
            rules: [
              {
                required: true
              },
            ],
          })(
            <Select  placeholder="请选择职位" >
                <Option  value="0">助理主管</Option>
                <Option  value="1">主管</Option>
                <Option  value="2">管理员</Option>
            </Select>
            )}
        </FormItem>
        
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  subject:PropTypes.array,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
