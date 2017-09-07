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
        <p slot="title">汇报查询</p>
        <div slot="body">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row>
              <Col span="6">
              <FormItem label="助理主管" prop="name" :show-message="false">
                <Input size="small" v-model="formValidate.name" placeholder="请输入助理主管姓名"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="学科组">
                <Select size="small" v-model="formValidate.subject" placeholder="请选择学科组">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select> </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="预排速度">
                <Select size="small" v-model="formValidate.prespeed" placeholder="请选择预排速度">
                <Option value="fast">较快</Option>
                <Option value="normal">正常</Option>
                <Option value="slow">较慢</Option>
            </Select> </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="结转速度">
                <Select size="small" v-model="formValidate.speed" placeholder="请选择结转速度">
                <Option value="fast">较快</Option>
                <Option value="normal">正常</Option>
                <Option value="slow">较慢</Option>
            </Select> </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="20">
              <FormItem label="选择日期">
                <DatePicker size="small" type="daterange" format="yyyy-MM-dd" v-model="formValidate.date" placeholder="选择日期"
                  style="width: 250px"></DatePicker>
              </FormItem>
              </Col>
              <Col span="4">
              <FormItem>
                <Button type="primary" size="small" @click="handleSubmit('formValidate')">提交</Button> </FormItem>
              </Col>
            </Row>
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
    <Page :total="40" size="small" show-total show-sizer></Page>
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
      const valiName = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else {
          if (!/^[\u4e00-\u9fa5_a-zA-Z0-9_]{0,10}$/.test(value)) {
            callback(new Error('请输入正确的姓名'));
          } else {
            callback();
          }
        }
      };
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
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: 'green'
                }
              }, '较快');
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
              return h('span', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  color: 'green'
                }
              }, '较快');
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
          subject: '',
          prespeed: '',
          speed: '',
          date: [],
        },
        ruleValidate: {
          name: [{
            validator: valiName,
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
            console.log(this.formValidate);
          }
        })
      }
    }
  };

</script>
<style lang="scss" scoped>
  .assistantList {
    .ivu-form-item {
      margin-bottom: 10px;
    }
  }

</style>
