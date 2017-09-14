import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Select , Row, Col } from 'antd';
import Plate from 'components/plate/plate';
import styles from './search.less'
const FormItem = Form.Item;
const Option = Select.Option;

const Searchform=({
    searchData,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
        }
})=>{
    function handleSearch(e){
        e.preventDefault();
          validateFields((errors,fieldsValue) => {
                if (!errors) {
                    const data = {
                       ...fieldsValue,
                     };
                    searchData(data);
                }
              });
      }
    //正则验证姓名
	function valiName(rule, value, callback){
        if (value === '') {
            callback();
          } else {
            if (!/^[\u4e00-\u9fa5_a-zA-Z_]{0,10}$/.test(value)) {
              callback(new Error('     '));
            } else {
              callback();
            }
          }    
    }
    // 正则验证用户名
    function valiUsername(rule, value, callback){
        if (value === '') {
            callback();
          } else {
            if (!/^[a-z_]{0,10}$/.test(value)) {
              callback(new Error('     '));
            } else {
              callback();
            }
          }    
    }
return (
    <Plate title="用户查询">
        <Form layout="inline" className={styles.searchform}>
            <Row >
                <Col  span={5} >
                    <FormItem
                    label="姓名"
                    >
                    {getFieldDecorator('name', {
                        rules:[{validator: valiName}],
                        validateTrigger:'onBlur'
                    })(
                        <Input size="small" placeholder="请输入姓名" />
                    )}
                    </FormItem>
                </Col>
                <Col  span={5} >
                    <FormItem
                    label="用户名"
                    >
                    {getFieldDecorator('username', {
                        rules:[{validator: valiUsername}],
                        validateTrigger:'onBlur'
                    })(
                        <Input size="small" placeholder="请输入用户名" />
                    )}
                    </FormItem>
                </Col>
                <Col  span={5} >
                    <FormItem
                    label="学科组"
                    >
                    {getFieldDecorator('subject', {
                    })(
                    <Select size="small" placeholder="请选择学科组" style={{ width: 147,textAlign:'left' }} allowClear>
                        <Option  value="">全部</Option>
                    </Select>
                    )}
                    </FormItem>
                </Col>
                <Col  span={5} >
                    <FormItem
                    label="职位"
                    >
                    {getFieldDecorator('role', {
                    })(
                    <Select size="small" placeholder="请选择职位" style={{ width: 147,textAlign:'left' }} allowClear>
                        <Option  value="0">助理主管</Option>
                        <Option  value="1">主管</Option>
                        <Option  value="2">管理员</Option>
                    </Select>
                    )}
                    </FormItem>
                </Col>
                <Col  span={2} >
               
                </Col>
                <Col  span={2} >
                <FormItem>
                <Button type="primary" size="default" onClick={handleSearch}>查询</Button>
                </FormItem>
                </Col>
            </Row>
        </Form>
    </Plate>
);
}

Searchform.propTypes = {
    form: PropTypes.object,
    searchData:PropTypes.func
  };

export default Form.create()(Searchform);