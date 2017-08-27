<template>
  <div class="input-center">
    <h2 class="director-title">基础汇报</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="form">
      <Row>
        <Col span="12">
        <Form-item label="本月预排完成率" prop="prescheduling">
          <!-- <Input v-model="formValidate.name" placeholder="请输入姓名"></Input> --><label>
            <Input style="width:120px" v-model="formValidate.prescheduling"></Input> %</label> </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="本月结转完成率" prop="carryover"> <label>
            <Input style="width:120px" v-model="formValidate.carryover"></Input> %</label> </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <Form-item label="Q1预排完成率" prop="Q1prescheduling"> <label>
            <Input style="width:120px" v-model="formValidate.Q1prescheduling"></Input> %</label> </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="Q1结转完成率" prop="Q1carryover"> <label>
            <Input style="width:120px" v-model="formValidate.Q1carryover"></Input> %</label> </Form-item>
        </Col>
      </Row>
      <Form-item label="采取措施和情况" prop="takesteps">
        <Input v-model="formValidate.takesteps" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="预排完成速度" prop="prespeed">
        <Radio-group v-model="formValidate.prespeed">
          <Radio label="较快">较快</Radio>
          <Radio label="正常">正常</Radio>
          <Radio label="较慢">较慢</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="结转完成速度" prop="speed">
        <Radio-group v-model="formValidate.speed">
          <Radio label="较快">较快</Radio>
          <Radio label="正常">正常</Radio>
          <Radio label="较慢">较慢</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="结转原因分析" prop="reason">
        <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="后续采取措施" prop="takemeasures">
        <Input v-model="formValidate.takemeasures" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="结转前五名" prop="firstfive">
        <Input v-model="formValidate.firstfive" placeholder="请填写姓名并用逗号隔开"></Input>
      </Form-item>
      <Form-item label="结转后五名" prop="lastfive">
        <Input v-model="formValidate.lastfive" placeholder="请填写姓名并用逗号隔开"></Input>
      </Form-item>
      <!-- <Form-item label="教研情况" prop="research">
                                  <Input v-model="formValidate.research" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                                </Form-item> -->
      <!-- <Form-item label="产品研发情况" prop="development">
                                  <Input v-model="formValidate.development" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                                </Form-item> -->
      <Form-item label="其他工作情况" prop="others">
        <Input v-model="formValidate.others" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <!-- <Form-item label="备注" prop="remarks">
                                  <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
                                </Form-item> -->
      <Form-item label="是否进行教研" prop="isresearch"> <label>
          <Select v-model="formValidate.isresearch" @on-change="selectchange" style="width:200px">
            <Option v-for="item in isresearchList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          {{status}}</label> </Form-item>
      <div class="operation" v-show="show">
        <Alert type="warning" show-icon>注意：二种上传方式可任选一种(二选一)或者多种</Alert>
        <p class="result-title">pdf或word上传处：</p>
        <div class="upload">
          <Upload type="drag" action="/node/api/researchfile" :on-success="onfilesuccess" :before-upload="fileBeforeUpload"
            :on-remove="fileRemove">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" :show-upload-list="false"></Icon>
              <p>点击或将文件拖拽到这里上传(教研记录pdf或word)</p>
            </div>
          </Upload>
        </div>
        <p class="result-title">图片上传(最多上传5张)：</p>
        <div class="uploadimg">
          <div class="demo-upload-list" v-for="item in uploadList">
            <template v-if="item.status === 'finished'"> <img :src="item.url">
              <div class="demo-upload-list-cover">
                <Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
              </div>
            </template>
            <template v-else>
              <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
            </template>
          </div>
          <Upload ref="upload" :show-upload-list="false" :default-file-list="defaultList" :on-success="handleSuccess" :format="['jpg','jpeg','png']"
            :max-size="2048" :on-format-error="handleFormatError" :on-exceeded-size="handleMaxSize" :before-upload="handleBeforeUpload"
            multiple type="drag" action="/node/api/researchfile" style="display: inline-block;width:58px;">
            <div style="width: 58px;height:58px;line-height: 58px;">
              <Icon type="camera" size="20"></Icon>
            </div>
          </Upload>
          <Modal title="查看图片" v-model="visible"> <img :src="imgName" v-if="visible" style="width: 100%"> </Modal>
        </div>
      </div>
      <Form-item label="未教研说明" prop="notresearchreason" v-if="!show">
        <Input v-model="formValidate.notresearchreason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请说明未进行教研的理由"></Input>
      </Form-item>
      <Form-item class="btngroup">
        <Button type="primary" @click="handleSubmit('formValidate')" :loading="loading">下一步</Button>
        <!-- <Button type="primary" @click="" style="margin-left:60px;">修改</Button> -->
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left:60px;">清空</Button> </Form-item>
    </Form>
    <!-- <form action="/node/api/upload" method="post" enctype="multipart/form-data">
                              <input type="file" name="file" />
                              <input type="submit" value="ok" />
                            </form> -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        formValidate: {
          prescheduling: null, // 本月预排
          carryover: null, // 本月结转
          Q1prescheduling: null, // Q1预排
          Q1carryover: null, // Q1结转
          takesteps: '', // 采取措施和情况
          prespeed: '', // 预排速度
          speed: '', // 结转速度
          reason: '', // 结转原因
          takemeasures: '', // 后续采取措施
          firstfive: '',
          lastfive: '',
          isresearch: 'false', // 教研情况
          notresearchreason: '', // 未教研说明
          others: '', // 其他职能工作情况
          filepath: [],
          imgpath: [],
          // remarks: '' // 备注
        },
        show: false,
        status: '未教研',
        isresearchList: [{
          value: 'true',
          label: '是'
        }, {
          value: 'false',
          label: '否'
        }],
        fileList: [],
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
        ruleValidate: {
          prescheduling: [{
            required: true,
            message: '本月预排不能为空',
            trigger: 'blur'
          }], // 本月预排
          carryover: [{
            required: true,
            message: '本月结转不能为空',
            trigger: 'blur'
          }], // 本月结转
          Q1prescheduling: [{
            required: true,
            message: 'Q1预排不能为空',
            trigger: 'blur'
          }], // Q1预排
          Q1carryover: [{
            required: true,
            message: ' Q1结转不能为空',
            trigger: 'blur'
          }], // Q1结转
          takesteps: [{
            required: true,
            message: '采取措施和情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 采取措施和情况
          prespeed: [{
            required: true,
            message: '预排完成速度必选',
            trigger: 'blur'
          }], // 预排速度
          speed: [{
            required: true,
            message: '结转完成速度必选',
            trigger: 'blur'
          }], // 结转速度
          reason: [{
            required: true,
            message: '结转原因不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 结转原因
          takemeasures: [{
            required: true,
            message: '后续采取措施不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 后续采取措施
          firstfive: [{
            required: true,
            message: '结转前五名不能为空',
            trigger: 'blur'
          }, {
            max: 50,
            message: '字数不能超过50个字',
            trigger: 'blur'
          }], // 结转前五名
          lastfive: [{
            required: true,
            message: '结转后五名不能为空',
            trigger: 'blur'
          }, {
            max: 50,
            message: '字数不能超过50个字',
            trigger: 'blur'
          }], // 结转后五名
          research: [{
            required: true,
            message: '教研情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 教研情况
          development: [{
            required: true,
            message: '研发情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 研发情况
          others: [{
            required: true,
            message: '其他职能工作情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'blur'
          }], // 其他职能工作情况
          remarks: [{
            type: 'string',
            min: 0,
            max: 200,
            message: '备注字数限制在0到200字',
            trigger: 'blur'
          }], // 备注
          notresearchreason: [{
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
        }
      }
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            if (this.formValidate.isresearch === 'true') {
              this.formValidate.notresearchreason = '';
            }
            this.$emit('commit', this.formValidate);
          } else {
            // this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      selectchange(val) {
        if (val === 'true') {
          this.status = '已教研';
          this.show = true;
        } else {
          this.status = '未教研';
          this.show = false;
        }
      },
      onfilesuccess(res, file, fileList) {
        // 当文件上传成功
        try {
          if (res.code === 200) {
            this.fileList = fileList;
            this.formValidate.filepath.push(res.filepath);
          }
        } catch (err) {
          this.$Message.error(err.message);
        }
      },
      fileBeforeUpload(file) {
        // 文件上传前
        if (file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || file.type ===
          'application/pdf') {
          return true;
        } else {
          this.$Message.warning('上传文件的格式错误，只能上传word,pdf文件');
          return false;
        }
      },
      fileRemove(file, fileList) {
        //  当移除上传的文件时
      },
      /**
       * 上传图片
       */
      handleView(url) {
        this.imgName = url;
        console.log(url);
        this.visible = true;
      },
      handleRemove(file) {
        // 从 upload 实例删除数据
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        // 将删除后神域的图片地址放入表单
        let arr = [];
        for (let item of this.$refs.upload.fileList) {
          arr.push(item.path);
        }
        this.formValidate.imgpath = arr;
      },
      handleSuccess(res, file) {
        try {
          if (res.code === 200) {
            file.url = 'http://localhost:3001' + res.filepath;
            file.path = res.filepath;
            file.name = res.filename;
            // 将上传后的文件放入表单后期需要上传
            let arr = [];
            for (let item of this.$refs.upload.fileList) {
              arr.push(item.path);
            }
            this.formValidate.imgpath = arr;
          }
        } catch (err) {
          this.$Message.error(err.message);
        }
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
    }
  };

</script>
<style lang="scss" scoped>
  .input-center {
    width: 100%;
    padding: 0 20px;
    margin: 10px auto;
  }

  .director-title {
    text-align: center;
    border-bottom: 1px solid #666;
    padding: 10px 0;
    margin-bottom: 40px;
  }

  .form {
    padding: 0 40px 0 20px;
  }

  .btngroup {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin-bottom:100px;
  }

  .result-title {
    font-size: 14px;
    padding: 20px 0;
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

</style>
