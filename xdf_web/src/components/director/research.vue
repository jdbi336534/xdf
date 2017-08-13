<template>
    <div class="research">
        <h2 class="research-title">教研情况</h2>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="110" class="form">
            <div class="isresearch">
                <Form-item label="是否进行教研" prop="isresearch">
                    <label>
                        <Select v-model="formValidate.isresearch" @on-change="selectchange" style="width:200px">
                            <Option v-for="item in isresearchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                        </Select>
                        {{status}}</label>
                </Form-item>
            </div>
            <div class="operation" v-if="show">
                <Alert type="warning" show-icon>注意：三种方式可任选一种(三选一)或者多种方式</Alert>
                <p class="result-title">pdf或word上传处：</p>
                <div class="upload">
                    <Upload type="drag" action="//jsonplaceholder.typicode.com/posts/">
                        <div style="padding: 20px 0">
                            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" :show-upload-list="false"></Icon>
                            <p>点击或将文件拖拽到这里上传(教研记录pdf或word)</p>
                        </div>
                    </Upload>
                </div>
                <p class="result-title">图片上传(最多上传5张)：</p>
                <div class="uploadimg">
                    <div class="demo-upload-list" v-for="item in uploadList">
                        <template v-if="item.status === 'finished'">
                            <img :src="item.url">
                            <div class="demo-upload-list-cover">
                                <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                            </div>
                        </template>
                        <template v-else>
                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                        </template>
                    </div>
                    <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']" :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload" multiple type="drag" action="//jsonplaceholder.typicode.com/posts/" style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                    <Modal title="查看图片" v-model="visible">
                        <img :src="'https://o5wwk8baw.qnssl.com/' + imgName + '/large'" v-if="visible" style="width: 100%">
                    </Modal>
                </div>
            </div>
            <Form-item label="未教研说明" prop="notresearch" v-if="!show">
                <Input v-model="formValidate.notresearch" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请说明未进行教研的理由"></Input>
            </Form-item>
            <Form-item class="btngroup">
                <Button type="primary" @click="handleSubmit('formValidate')">完成</Button>
            </Form-item>
        </Form>
    </div>
</template>
<script>
import { } from '../../services/query';
export default {
    data() {
        return {
            isresearchList: [
                {
                    value: 'true',
                    label: '是'
                },
                {
                    value: 'false',
                    label: '否'
                }
            ],
            formValidate: {
                isresearch: 'true',
                notresearch: ''
            },
            status: '已教研',
            show: true,
            ruleValidate: {
                notresearch: [{
                    required: true,
                    message: '未教研说明不能为空',
                    trigger: 'blur'
                }, {
                    max: 500,
                    message: '字数不能超过500个字',
                    trigger: 'blur'
                }], // 本月预排
                isresearch: [{
                    required: true,
                    message: '是否教研必填',
                    trigger: 'change'
                }]
            },
            defaultList: [
                {
                    'name': 'a42bdcc1178e62b4694c830f028db5c0',
                    'url': 'https://o5wwk8baw.qnssl.com/a42bdcc1178e62b4694c830f028db5c0/avatar'
                },
                {
                    'name': 'bc7521e033abdd1e92222d733590f104',
                    'url': 'https://o5wwk8baw.qnssl.com/bc7521e033abdd1e92222d733590f104/avatar'
                }
            ],
            imgName: '',
            visible: false,
            uploadList: []
        }
    },
    methods: {
        selectchange(val) {
            if (val === 'true') {
                this.status = '已教研';
                this.show = true;
            } else {
                this.status = '未教研';
                this.show = false;
            }
        },
        handleSubmit(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleView(name) {
            this.imgName = name;
            this.visible = true;
        },
        handleRemove(file) {
            // 从 upload 实例删除数据
            const fileList = this.$refs.upload.fileList;
            this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        },
        handleSuccess(res, file) {
            // 因为上传过程为实例，这里模拟添加 url
            file.url = 'https://o5wwk8baw.qnssl.com/7eb99afb9d5f317c912f08b5212fd69a/avatar';
            file.name = '7eb99afb9d5f317c912f08b5212fd69a';
        },
        handleFormatError(file) {
            this.$Notice.warning({
                title: '文件格式不正确',
                desc: '文件 ' + file.name + ' 格式不正确，请上传 jpg 或 png 格式的图片。'
            });
        },
        handleMaxSize(file) {
            this.$Notice.warning({
                title: '超出文件大小限制',
                desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
            });
        },
        handleBeforeUpload() {
            const check = this.uploadList.length < 5;
            if (!check) {
                this.$Notice.warning({
                    title: '最多只能上传 5 张图片。'
                });
            }
            return check;
        }
    },
    mounted() {
        this.uploadList = this.$refs.upload.fileList;
    }
}

</script>
<style lang="scss" scoped>
.research {
    width: 100%;
    padding: 0 20px;
    margin: 10px auto;
    .form {
        margin-top: 30px;
    }
    .operation {
        margin: 30px 0;
    }
    .research-title {
        text-align: center;
        border-bottom: 1px solid #666;
        padding: 10px 0;
        margin-bottom: 40px;
    }
    .upload {
        width: 600px;
        margin: 0 auto;
    }
    .result-title {
        font-size: 14px;
        padding: 20px 0;
    }
    .btngroup {
        // text-align: center;
        >div {
            >button {
                position: relative;
                left: calc(50% - 87px);
                margin: 0 auto;
            }
        }
        margin-top: 30px;
    }
    .uploadimg {
        .demo-upload-list {
            display: inline-block;
            width: 60px;
            height: 60px;
            text-align: center;
            line-height: 60px;
            border: 1px solid transparent;
            border-radius: 4px;
            overflow: hidden;
            background: #fff;
            position: relative;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
            margin-right: 4px;
        }
        .demo-upload-list img {
            width: 100%;
            height: 100%;
        }
        .demo-upload-list-cover {
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0, 0, 0, .6);
        }
        .demo-upload-list:hover .demo-upload-list-cover {
            display: block;
        }
        .demo-upload-list-cover i {
            color: #fff;
            font-size: 20px;
            cursor: pointer;
            margin: 0 2px;
        }
    }
}
</style>
