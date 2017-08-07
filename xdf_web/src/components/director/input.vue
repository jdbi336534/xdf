<style scoped>
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
  }

</style>
<template>
  <div class="input-center">
    <h2 class="director-title">主管汇报统计</h2>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="120" class="form">
      <Row>
        <Col span="12">
        <Form-item label="本月预排完成率" prop="prescheduling">
          <!-- <Input v-model="formValidate.name" placeholder="请输入姓名"></Input> --><label>
                        <Input-number :max="999" :min="1" v-model="formValidate.prescheduling"></Input-number> %</label>          </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="本月结转完成率" prop="carryover"> <label>
                        <Input-number :max="999" :min="1" v-model="formValidate.carryover"></Input-number> %</label> </Form-item>
        </Col>
      </Row>
      <Row>
        <Col span="12">
        <Form-item label="Q1预排完成率" prop="Q1prescheduling"> <label>
                        <Input-number :max="999" :min="1" v-model="formValidate.Q1prescheduling"></Input-number> %</label>          </Form-item>
        </Col>
        <Col span="12">
        <Form-item label="Q1结转完成率" prop="Q1carryover"> <label>
                        <Input-number :max="999" :min="1" v-model="formValidate.Q1carryover"></Input-number> %</label> </Form-item>
        </Col>
      </Row>
      <Form-item label="采取措施和情况" prop="takesteps">
        <Input v-model="formValidate.takesteps" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="结转速度" prop="speed">
        <Radio-group v-model="formValidate.speed">
          <Radio label="fast">较快</Radio>
          <Radio label="normal">正常</Radio>
          <Radio label="slow">较慢</Radio>
        </Radio-group>
      </Form-item>
      <Form-item label="结转原因分析" prop="reason">
        <Input v-model="formValidate.reason" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="结转采取措施" prop="takemeasures">
        <Input v-model="formValidate.takemeasures" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="教研情况" prop="research">
        <Input v-model="formValidate.research" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="产品研发情况" prop="development">
        <Input v-model="formValidate.development" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="其他职能工作情况" prop="others">
        <Input v-model="formValidate.others" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item label="备注" prop="remarks">
        <Input v-model="formValidate.remarks" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder=""></Input>
      </Form-item>
      <Form-item class="btngroup">
        <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
        <Button type="primary" @click="" style="margin-left:60px;">修改</Button>
        <Button type="ghost" @click="handleReset('formValidate')" style="margin-left:60px;">重置</Button> </Form-item>
    </Form>
  </div>
</template>
<script>
  import {
    getuser
  } from '../../services/login';
  export default {
    data() {
      return {
        formValidate: {
          prescheduling: null, // 本月预排
          carryover: null, // 本月结转
          Q1prescheduling: null, // Q1预排
          Q1carryover: null, // Q1结转
          takesteps: '', // 采取措施和情况
          speed: '', // 结转速度
          reason: '', // 结转原因
          takemeasures: '', // 结转采取措施
          research: '', // 教研情况
          development: '', // 研发情况
          others: '', // 其他职能工作情况
          remarks: '' // 备注
        },
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
            trigger: 'change'
          }], // 采取措施和情况
          speed: [{
            required: true,
            message: '结转速度必选',
            trigger: 'blur'
          }], // 结转速度
          reason: [{
            required: true,
            message: '结转原因不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'change'
          }], // 结转原因
          takemeasures: [{
            required: true,
            message: '结转采取措施不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'change'
          }], // 结转采取措施
          research: [{
            required: true,
            message: '教研情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'change'
          }], // 教研情况
          development: [{
            required: true,
            message: '研发情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'change'
          }], // 研发情况
          others: [{
            required: true,
            message: '其他职能工作情况不能为空',
            trigger: 'blur'
          }, {
            max: 500,
            message: '字数不能超过500个字',
            trigger: 'change'
          }], // 其他职能工作情况
          remarks: [{
            type: 'string',
            min: 0,
            max: 200,
            message: '备注字数限制在0到200字',
            trigger: 'blur'
          }] // 备注
        }
      }
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
      },
      handleReset(name) {
        getuser().then(res => {
          console.log(res);
        });
        this.$refs[name].resetFields();
      }
    }
  };

</script>
