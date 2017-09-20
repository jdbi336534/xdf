import React from 'react'
import PropTypes from 'prop-types'
import { Form, Icon, Input, Button, Select , Row, Col, Radio,Upload,Modal,Alert } from 'antd';
import Plate from 'components/plate/plate';
import PicturesWall from './uploadimg';
import FilesWall from './uploadfile';
import ExcelWall from './uploadxlsx';
import styles from './form.less'
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const { TextArea } = Input;



const Reportform=({
    Loading,
    report,    
    reportData,
    getImagepathArr,
    getFilepathArr,
    deleteImage,
    deleteFile,
    isChange,
    getExcelData,
    deleteExcel,
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

      const formItemLayout = {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 3},
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 12 },
        },
      };
     
    
return (
    <div>
        <Form  >
        <Plate title="基础汇报">
                        <FormItem
                        {...formItemLayout}
                        label="本月预排完成率"
                        >
                        {getFieldDecorator('prescheduling', {
                            rules:[
                            {required:true,message:'请输入本月预排完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <label><Input  placeholder="请输入" style={{width:'8vw'}}/>%</label>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="本月结转完成率"
                        >
                        {getFieldDecorator('carryover', {
                            rules:[
                            {required:true,message:'请输入本月结转完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <label><Input  placeholder="请输入" style={{width:'8vw'}} />%</label>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="Q1预排完成率"
                        >
                        {getFieldDecorator('Q1prescheduling', {
                            rules:[
                            {required:true,message:'请输入Q1预排完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <label><Input  placeholder="请输入" style={{width:'8vw'}}/>%</label>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="Q1结转完成率"
                        >
                        {getFieldDecorator('Q1carryover', {
                            rules:[
                            {required:true,message:'请输入Q1结转完成率'},
                            {pattern: /^(([1-9]\d?)|100)$/,message: '请输入1-100的数字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <label><Input  placeholder="请输入" style={{width:'8vw'}}/>%</label>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
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
                        <FormItem
                        {...formItemLayout}
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
                        <FormItem
                        {...formItemLayout}
                        label="采取措施情况"
                        >
                        {getFieldDecorator('takesteps', {
                            rules:[
                            {required:true,message:'请选择采取的措施和情况'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入为增加预排采取的措施和情况"  autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="结转原因分析"
                        >
                        {getFieldDecorator('reason', {
                            rules:[
                            {required:true,message:'请输入结转原因分析'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入结转原因分析"  autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="后续采取措施"
                        >
                        {getFieldDecorator('takemeasures', {
                            rules:[
                            {required:true,message:'请输入后续采取措施'},
                            {max:500,message:'不能超过500个字符'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入后续采取措施"  autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="结转前五名"
                        >
                        {getFieldDecorator('firstfive', {
                            rules:[
                            {required:true,message:'请输入结转前五名'},
                            {max: 50,message: '字数不能超过50个字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea  autosize placeholder="请用逗号或者空格将姓名隔开" style={{width:'25vw'}}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="结转后五名"
                        >
                        {getFieldDecorator('lastfive', {
                            rules:[
                            {required:true,message:'请输入结转后五名'},
                            {max: 50,message: '字数不能超过50个字'}
                            ],
                            validateTrigger:'onBlur'
                        })(
                            <TextArea  autosize placeholder="请用逗号或者空格将姓名隔开" style={{width:'25vw'}}/>
                        )}
                        </FormItem>
                        <FormItem
                        {...formItemLayout}
                        label="其他工作情况"
                        >
                        {getFieldDecorator('others', {
                            rules:[
                                {required:true,message:'请输入其他工作情况'},
                                {max:500,message:'不能超过500个字符'}
                                ],
                                validateTrigger:'onBlur'
                        })(
                            <TextArea placeholder="请输入其他工作情况"  autosize style={{width:'40vw'}}/>
                        )}
                        </FormItem>
        </Plate>
        <Plate title="教研汇报">
       
                <FormItem
                {...formItemLayout}
                label="是否进行教研"
                >
                {getFieldDecorator('isresearch', {
                    initialValue:'false',
                    rules:[
                    {required:true,message:'请选择'}
                    ],
                    validateTrigger:'onChange'
                })(
                    <Select  style={{ width: 120 }}  onChange={isChange}>
                    <Option value="true">是</Option>
                    <Option value="false">否</Option>
                    </Select>
                )}
                </FormItem>
           
        {!report ?
                <FormItem
                {...formItemLayout}
                label="未教研说明"
                >
                {getFieldDecorator('notresearchreason', {
                        rules:[
                        {required:true,message:'请输入其他工作情况'},
                        {max:500,message:'不能超过500个字符'}
                        ],
                        validateTrigger:'onBlur'
                })(
                    <TextArea placeholder="请输入其他工作情况"  autosize style={{width:'40vw'}}/>
                )}
                </FormItem>
        :
        <div>
                <FormItem
                {...formItemLayout}
                label="已教研说明"
                >
                {getFieldDecorator('researchexp', {
                        rules:[
                        {required:true,message:'请输入其他工作情况'},
                        {max:500,message:'不能超过500个字符'}
                        ],
                        validateTrigger:'onBlur'
                })(
                     <TextArea placeholder="请输入其他工作情况"  autosize style={{width:'40vw'}}/>
                )}
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="图片上传(最多5张)"
                >
                <PicturesWall onSuccess={getImagepathArr} onRemoveImg={deleteImage}/>
                </FormItem>
                <FormItem
                {...formItemLayout}
                label="文件上传(最多3个)"
                >
                <div style={{width:'30vw'}}>
                <FilesWall onSuccess={getFilepathArr} onRemoveFile={deleteFile} />
                </div>
                </FormItem>
        </div>
        }
        </Plate>
        <Plate title="四折标课汇报">
            <Alert
                message="上传四折标课Excel步骤"
                description="Additional description and informations about copywriting."
                type="info"
                showIcon
                style={{marginBottom:15}}
            />
            <div style={{width:'50vw',marginBottom:20}}>
                <ExcelWall onSuccess={getExcelData} onRemove={deleteExcel} />
            </div>
        </Plate>
            <FormItem
            style={{textAlign:'center',paddingTop:50,paddingBottom:50,marginBottom:0}}
            >
            <Button type="primary" size="large" icon="save" loading={Loading} onClick={handleSearch}>保存</Button>
            </FormItem>
        </Form>
    </div>
);
}

Reportform.propTypes = {
    form: PropTypes.object,
    reportData:PropTypes.func,
    getImagepathArr:PropTypes.func,
    getFilepathArr:PropTypes.func,
    deleteImage:PropTypes.func,
    deleteFile:PropTypes.func,
    isChange:PropTypes.func,
    getExcelData:PropTypes.func,
    deleteExcel:PropTypes.func,
    report:PropTypes.bool,
    Loading:PropTypes.bool
  };

export default Form.create()(Reportform);