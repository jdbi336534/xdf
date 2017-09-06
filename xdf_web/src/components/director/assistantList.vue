<template>
  <div class="assistantList">
    <div style="padding:20px;">
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon> 工作情况 </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon> 助理主管汇报结果 </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="padding: 20px;padding-top:0;">
      <card>
        <p slot="title">查询信息</p>
        <div slot="body">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="助理主管" prop="name">
              <Input v-model="formValidate.name" placeholder="请输入助理主管姓名"></Input>
            </FormItem>
            <FormItem label="学科组" prop="city">
              <Select v-model="formValidate.city" placeholder="请选择学科组">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select> </FormItem>
            <FormItem label="预排速度" prop="city">
              <Select v-model="formValidate.city" placeholder="请选择预排速度">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select> </FormItem>
            <FormItem label="结转速度" prop="city">
              <Select v-model="formValidate.city" placeholder="请选择结转速度">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select> </FormItem>
            <FormItem label="选择日期">
              <Row>
                <Col span="11">
                <FormItem prop="date">
                  <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
                </FormItem>
                </Col>
                <Col span="2" style="text-align: center">-</Col>
                <Col span="11">
                <FormItem prop="time">
                  <TimePicker type="time" placeholder="选择时间" v-model="formValidate.time"></TimePicker>
                </FormItem>
                </Col>
              </Row>
            </FormItem>
            <FormItem>
              <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
              <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button> </FormItem>
          </Form>
        </div>
      </card>
    </div>
    <div style="padding: 20px;padding-top:0;">
      <div style="border-top:1px solid rgb(221, 222, 225);">
        <div style="padding:10px;font-weight:600;border-left:1px solid rgb(221, 222, 225);border-right:1px solid rgb(221, 222, 225);">
          <p>汇报列表</p>
        </div>
        <Table height="560" :columns="columns1" :data="tableData"></Table>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getAssistantList
  } from '../../services/query';
  import card from '../common/card';
  import moment from 'moment';
  export default {
    data() {
      return {
        i: 0,
        columns1: [{
          title: '助理主管',
          key: 'name'
        }, {
          title: '学科组',
          key: 'subject'
        }, {
          title: '本月预排',
          key: 'prescheduling',
          render: (h, params) => {
            return params.row.prescheduling + '%';
          }
        }, {
          title: '本月结转',
          key: 'carryover',
          render: (h, params) => {
            return params.row.carryover + '%';
          }
        }, {
          title: 'Q1预排',
          key: 'Q1prescheduling',
          render: (h, params) => {
            return params.row.Q1prescheduling + '%';
          }
        }, {
          title: 'Q1结转',
          key: 'Q1carryover',
          render: (h, params) => {
            return params.row.Q1carryover + '%';
          }
        }, {
          title: '预排速度',
          key: 'prespeed',
          render: (h, params) => {
            if (params.row.prespeed === 'fast') {
              return '较快';
            } else if (params.row.prespeed === 'normal') {
              return '正常';
            } else if (params.row.prespeed === 'slow') {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: 'red'
                }
              }, '较慢');
            }
          }
        }, {
          title: '结转速度',
          key: 'speed',
          render: (h, params) => {
            if (params.row.speed === 'fast') {
              return '较快';
            } else if (params.row.speed === 'normal') {
              return '正常';
            } else if (params.row.speed === 'slow') {
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: 'red'
                }
              }, '较慢');
            }
          }
        }, {
          title: '教研情况',
          key: 'isresearch',
          render: (h, params) => {
            if (params.row.isresearch === 'false') {
              return '未教研';
            } else if (params.row.isresearch === 'true') {
              return '已教研';
            }
          }
        }, {
          title: '时间',
          key: 'create_time',
          render: (h, params) => {
            if (params.row.create_time) {
              return moment(params.row.create_time).format('YYYY-MM-DD');
            }
          }
        }, {
          title: '操作',
          key: 'action',
          width: 100,
          render: (h, params) => {
            return h('Button', {
              props: {
                type: 'text',
                size: 'small'
              }
            }, '查看详情');
          }
        }],
        tableData: [],
        formValidate: {
          name: '',
          mail: '',
          city: '',
          gender: '',
          interest: [],
          date: '',
          time: '',
          desc: ''
        },
        ruleValidate: {
          name: [{
            required: true,
            message: '姓名不能为空',
            trigger: 'blur'
          }],
          mail: [{
            required: true,
            message: '邮箱不能为空',
            trigger: 'blur'
          }, {
            type: 'email',
            message: '邮箱格式不正确',
            trigger: 'blur'
          }],
          city: [{
            required: true,
            message: '请选择城市',
            trigger: 'change'
          }],
          gender: [{
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }],
          interest: [{
            required: true,
            type: 'array',
            min: 1,
            message: '至少选择一个爱好',
            trigger: 'change'
          }, {
            type: 'array',
            max: 2,
            message: '最多选择两个爱好',
            trigger: 'change'
          }],
          date: [{
            required: true,
            type: 'date',
            message: '请选择日期',
            trigger: 'change'
          }],
          time: [{
            required: true,
            type: 'date',
            message: '请选择时间',
            trigger: 'change'
          }],
          desc: [{
            required: true,
            message: '请输入个人介绍',
            trigger: 'blur'
          }, {
            type: 'string',
            min: 20,
            message: '介绍不能少于20字',
            trigger: 'blur'
          }]
        }
      }
    },
    components: {
      card
    },
    mounted() {
      this.getList(1, 15);
    },
    methods: {
      async getList(page, size) {
        try {
          let {
            data
          } = await getAssistantList({
            page,
            size
          });
          if (data.code !== 200) {
            throw new Error(data.msg);
          }
          this.tableData = data.data;
        } catch (err) {
          this.$Message.error(err.message);
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
      handleReset(name) {
        this.$refs[name].resetFields();
      }
    }
  };

</script>
<style lang="scss" scoped>
  .assistantList {}

</style>
