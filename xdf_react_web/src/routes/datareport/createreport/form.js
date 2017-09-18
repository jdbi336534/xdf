import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Select , Row, Col, Radio,Upload,Modal} from 'antd';
import Plate from 'components/plate/plate';
import PicturesWall from './uploadimg';
import styles from './form.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;



const Reportform=({
    reportData,
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
                    reportData(data);
                }
              });
      }
      function uploadSuccess(patharr){
        //   上传的图片路径数组
        console.log(patharr);
      }
      function removeImg(imgpath){
        //  删除的图片的路径，调取接口删除后期
          console.log(imgpath);
      }
    
return (
    <div>
        <Form layout="inline" >
        <Plate title="基础汇报">
                <Row >
                    <Col  span={6} >
                        <FormItem
                        label="本月预排完成率(%)"
                        >
                        {getFieldDecorator('prescheduling', {
                            rules:[
                            {required:true,message:'请输入本月预排完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <Input size="small" placeholder="请输入" style={{width:'8vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    <Col  span={6} >
                        <FormItem
                        label="本月结转完成率(%)"
                        >
                        {getFieldDecorator('carryover', {
                            rules:[
                            {required:true,message:'请输入本月结转完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <Input size="small" placeholder="请输入" style={{width:'8vw'}} />
                        )}
                        </FormItem>
                    </Col>
                    <Col  span={6} >
                        <FormItem
                        label="Q1预排完成率(%)"
                        >
                        {getFieldDecorator('Q1prescheduling', {
                            rules:[
                            {required:true,message:'请输入Q1预排完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <Input size="small" placeholder="请输入" style={{width:'8vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    <Col  span={6} >
                        <FormItem
                        label="Q1结转完成率(%)"
                        >
                        {getFieldDecorator('Q1carryover', {
                            rules:[
                            {required:true,message:'请输入Q1结转完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <Input size="small" placeholder="请输入" style={{width:'8vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                   
                </Row>
                <Row >
                    <Col  span={12} >
                        <FormItem
                        label="预排完成速度"
                        >
                        {getFieldDecorator('prespeed', {
                            rules:[
                            {required:true,message:'请选择预排完成速度'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <RadioGroup>
                            <Radio value="fast">较快</Radio>
                            <Radio value="normal">正常</Radio>
                            <Radio value="slow">较慢</Radio>
                            </RadioGroup>
                        )}
                        </FormItem>
                    </Col>
                    <Col  span={12} >
                        <FormItem
                        label="结转完成速度"
                        >
                        {getFieldDecorator('speed', {
                            rules:[
                            {required:true,message:'请选择预排完成速度'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <RadioGroup>
                            <Radio value="fast">较快</Radio>
                            <Radio value="normal">正常</Radio>
                            <Radio value="slow">较慢</Radio>
                            </RadioGroup>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <Row >
                    <Col  span={24} >
                        <FormItem
                        label="采取的措施和情况"
                        >
                        {getFieldDecorator('takesteps', {
                            rules:[
                            {required:true,message:'请选择采取的措施和情况'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入为增加预排采取的措施和情况" size="small" autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <Row >
                    <Col  span={24} >
                        <FormItem
                        label="结转原因分析"
                        >
                        {getFieldDecorator('reason', {
                            rules:[
                            {required:true,message:'请输入结转原因分析'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入结转原因分析" size="small" autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <Row >
                    <Col  span={24} >
                        <FormItem
                        label="后续采取措施"
                        >
                        {getFieldDecorator('takemeasures', {
                            rules:[
                            {required:true,message:'请输入后续采取措施'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入后续采取措施" size="small" autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <Row >
                    <Col  span={12} >
                        <FormItem
                        label="结转前五名"
                        >
                        {getFieldDecorator('firstfive', {
                            rules:[
                            {required:true,message:'请输入结转前五名'},
                            {max: 50,message: '字数不能超过50个字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea size="small" autosize placeholder="请用逗号或者空格将姓名隔开" style={{width:'25vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    <Col  span={12} >
                        <FormItem
                        label="结转后五名"
                        >
                        {getFieldDecorator('lastfive', {
                            rules:[
                            {required:true,message:'请输入结转后五名'},
                            {max: 50,message: '字数不能超过50个字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea size="small" autosize placeholder="请用逗号或者空格将姓名隔开" style={{width:'25vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
                    <Row >
                    <Col  span={24} >
                        <FormItem
                        label="其他工作情况"
                        >
                        {getFieldDecorator('others', {
                            rules:[
                                {required:true,message:'请输入其他工作情况'},
                                {max:500,message:'不能超过500个字符'}
                                ],
                                validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入其他工作情况" size="small" autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                    </Col>
                    </Row>
           
        </Plate>
        <Plate title="教研汇报">
        <Row >
            <Col  span={24} >
                <FormItem
                label="是否教研"
                >
                {getFieldDecorator('isresearch', {
                    rules:[
                    {required:true,message:'请选择'}
                    ],
                    validateTrigger:'onChange'
                })(
                    <Select  style={{ width: 120 }} size="small" >
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                    </Select>
                )}
                </FormItem>
            </Col>
        </Row>   
        <Row >  
            <PicturesWall onSuccess={uploadSuccess} onRemoveImg={removeImg}/>
        </Row>  
        </Plate>
            <FormItem>
            <Button type="primary" size="default" onClick={handleSearch}>查询</Button>
            </FormItem>
        </Form>
    </div>
);
}

Reportform.propTypes = {
    form: PropTypes.object,
    reportData:PropTypes.func,
    subject: PropTypes.array
  };

export default Form.create()(Reportform);