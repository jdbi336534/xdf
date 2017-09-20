import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Select , Row, Col, DatePicker } from 'antd';
import Plate from 'components/plate/plate';
import styles from './search.less'
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;

const Searchform=({
    subject,
    searchData,
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue
        }
})=>{

    const subjectOptions=subject.map((item,key)=>{
        return(
         <Option key={key} value={item.subject}>{item.subject}</Option>
       );
    });

    function handleSearch(e){
        e.preventDefault();
          validateFields((errors,fieldsValue) => {
                if (!errors) {
                    const rangeValue = fieldsValue['range']||[];
                    const data = {
                       ...fieldsValue,
                       'start':rangeValue.length>0?rangeValue[0].format('YYYY-MM-DD'):undefined,
                       'end':rangeValue.length>0?rangeValue[1].format('YYYY-MM-DD'):undefined
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
return (
    <Plate title="汇报查询">
        <Form layout="inline" className={styles.searchform}>
            <Row >
                <Col  span={6} >
                    <FormItem
                    label="姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名"
                    >
                    {getFieldDecorator('name', {
                        rules:[{validator: valiName}],
                        validateTrigger:'onBlur'
                    })(
                        <Input size="small" placeholder="请输入" />
                    )}
                    </FormItem>
                </Col>
                <Col  span={6} >
                    <FormItem
                    label="&nbsp;&nbsp;学&nbsp;科&nbsp;组"
                    >
                    {getFieldDecorator('subject')(
                    <Select size="small" placeholder="请选择学科组" style={{ width: 147,textAlign:'left' }} allowClear>
                        {subjectOptions}
                    </Select>
                    )}
                    </FormItem>
                </Col>
                <Col span={12}>
                <FormItem
                label="时间段"
                >
                {getFieldDecorator('range')(
                    <RangePicker size="small"/>
                )}
                </FormItem>
                </Col>
                
            </Row>
            <Row>
            <Col  span={6} >
                    <FormItem
                    label="预排速度"
                    >
                    {getFieldDecorator('prespeed')(
                    <Select size="small" placeholder="请选择预排速度" style={{ width: 147,textAlign:'left' }} allowClear>
                    <Option value="fast">较快</Option>
                    <Option value="normal">正常</Option>
                    <Option value="slow">较慢</Option>
                    </Select>
                    )}
                    </FormItem>
                </Col>
                <Col  span={6} >
                    <FormItem
                    label="&nbsp;结转速度"
                    >
                    {getFieldDecorator('speed')(
                    <Select size="small" placeholder="请选择结转速度" style={{ width: 147,textAlign:'left' }} allowClear>
                    <Option value="fast">较快</Option>
                    <Option value="normal">正常</Option>
                    <Option value="slow">较慢</Option>
                    </Select>
                    )}
                    </FormItem>
                </Col>
                <Col  span={8}>
                </Col>
                <Col  span={4} >
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
    searchData:PropTypes.func,
    subject: PropTypes.array
  };

export default Form.create()(Searchform);