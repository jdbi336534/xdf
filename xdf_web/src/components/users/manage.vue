<template>
  <div class="assistantList">
    <div style="padding:20px;">
      <Breadcrumb>
        <BreadcrumbItem>
          <Icon type="ios-home-outline"></Icon> 平台管理 </BreadcrumbItem>
        <BreadcrumbItem>
          <Icon type="social-buffer-outline"></Icon> 用户管理 </BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div style="padding: 20px;padding-top:0;">
      <card>
        <p slot="title">用户查询</p>
        <div slot="body">
          <Form ref="userForm" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Row>
              <Col span="6">
              <FormItem label="姓名" prop="name" :show-message="false">
                <Input size="small" v-model="formValidate.name" placeholder="请输入姓名"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="用户名" prop="username" :show-message="false">
                <Input size="small" v-model="formValidate.username" placeholder="请输入用户名"></Input>
              </FormItem>
              </Col>
              <Col span="6">
              <FormItem label="学科组">
                <Select size="small" v-model="formValidate.subject" clearable placeholder="请选择学科组">
                <Option value="fast">较快</Option>
                <Option value="normal">正常</Option>
                <Option value="slow">较慢</Option>
            </Select> </FormItem>
              </Col>
              <Col span="6">
              <FormItem style="float:right;">
                <Button type="primary" size="small" @click="handleSubmit('userForm')">查询</Button> </FormItem>
              </Col>
            </Row>
          </Form>
        </div>
      </card>
    </div>
    <div class="tableList">
      <div class="tablecontent">
        <div style="padding:10px;font-weight:600;border-left:1px solid rgb(221, 222, 225);border-right:1px solid rgb(221, 222, 225);">
          <p>用户列表</p>
        </div>
        <div style="padding-left:10px;font-weight:600;border-top:1px solid rgb(221, 222, 225);border-left:1px solid rgb(221, 222, 225);border-right:1px solid rgb(221, 222, 225);">
          <el-button type="text">
            <Icon type="plus-round"></Icon>新增用户</el-button>
        </div>
        <Table :columns="columns1" size="small" :data="tableData" class="vu-table"></Table>
      </div>
    </div>
    <div style="text-align:center;">
      <Page :total="40" size="small" show-total @on-change="pageChange"></Page>
    </div>
    <Modal v-model="modal" title="新增用户" :loading="modal_loading" :mask-closable="false" @on-ok="addNewuser('formCustom')">
      <Form ref="formCustom" :model="formCustom" :rules="ruleValidate2" :label-width="80">
        <FormItem label="姓名" prop="name">
          <Input type="text" v-model="formCustom.name"></Input>
        </FormItem>
        <FormItem label="用户名" prop="username">
          <Input type="text" v-model="formCustom.username"></Input>
        </FormItem>
        <FormItem label="学科组" prop="subject">
          <Select v-model="formValidate.subject" placeholder="请选择所在地">
                <Option value="beijing">北京市</Option>
                <Option value="shanghai">上海市</Option>
                <Option value="shenzhen">深圳市</Option>
            </Select> </FormItem>
      </Form>
      <div></div>
    </Modal>
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
          if (!/^[\u4e00-\u9fa5_a-zA-Z_]{0,6}$/.test(value)) {
            callback(new Error('请输入正确的姓名'));
          } else {
            callback();
          }
        }
      };
      const valiUsername = (rule, value, callback) => {
        if (value === '') {
          callback();
        } else {
          if (!/^[a-zA-Z0-9_]{0,16}$/.test(value)) {
            callback(new Error('请输入正确的用户名'));
          } else {
            callback();
          }
        }
      };
      const valiNewname = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入姓名'));
        } else {
          if (!/^[\u4e00-\u9fa5_a-zA-Z_]{0,6}$/.test(value)) {
            callback(new Error('请输入正确的姓名'));
          } else {
            callback();
          }
        }
      };
      const valiNewusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if (!/^[a-zA-Z0-9_]{0,16}$/.test(value)) {
            callback(new Error('请输入正确的用户名'));
          } else {
            callback();
          }
        }
      };
      return {
        columns1: [{
          title: '姓名',
          key: 'name',
          render: (h, params) => {
            return h('div', [
              h('Icon', {
                props: {
                  type: 'person'
                }
              }),
              h('strong', params.row.name)
            ]);
          }
        }, {
          title: '用户名',
          key: 'username'
        }, {
          title: '学科组',
          key: 'subject'
        }, {
          title: '操作',
          key: 'action',
          width: 180,
          render: (h, params) => {
            return h('div', [
              h('el-button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    console.log(params.index, params.row);
                  }
                }
              }, '重置密码'),
              h('el-button', {
                props: {
                  type: 'text',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.deleteitem(params.index, params.row);
                  }
                }
              }, '删除用户')
            ]);
          }
        }],
        tableData: [],
        modal: true,
        modal_loading: true,
        formValidate: {
          name: '',
          subject: '',
          username: ''
        },
        formCustom: {
          name: '',
          subject: '',
          username: ''
        },
        ruleValidate: {
          name: [{
            validator: valiName,
            trigger: 'blur'
          }],
          username: [{
            validator: valiUsername,
            trigger: 'blur'
          }],
          subject: [{
            required: true,
            trigger: 'change'
          }]
        },
        ruleValidate2: {
          name: [{
            required: true,
            validator: valiNewname,
            trigger: 'blur'
          }],
          username: [{
            required: true,
            validator: valiNewusername,
            trigger: 'blur'
          }],
          subject: [{
            required: true,
            message: '请选择学科组',
            trigger: 'change'
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
      deleteitem(index, row) {
        this.$Modal.confirm({
          title: '确认删除',
          content: '<p>您确认要删除此条内容吗？删除后将不可恢复</p>',
          loading: true,
          onOk: () => {
            setTimeout(() => {
              this.$Modal.remove();
              this.$Message.info('异步关闭了对话框');
            }, 2000);
          }
        });
      },
      formatterTime(row, column) {
        return moment(row.create_time).format('YYYY-MM-DD');
      },
      formatterIsresearch(row, colum) {
        if (row.isresearch === 'true') {
          return '已教研';
        } else {
          return '未教研';
        }
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formValidate);
          }
        })
      },
      addNewuser(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            console.log(this.formValidate);
          } else {
            console.log('filed');
          }
        })
      },
      pageChange(page) {}
    }
  };

</script>
<style lang="scss" scoped>
  .assistantList {
    height: 100%;
    width: 100%;
    .ivu-form-item {
      margin-bottom: 10px;
    }
    .tableList {
      padding: 20px;
      padding-top: 0;
      height: calc(100% - 250px);
      .tablecontent {
        height: 100%;
        border-top: 1px solid rgb(221, 222, 225);
        .vu-table {
          height: calc(100% - 73px);
        }
      }
    }
  }

</style>
<style lang="scss">
  .assistantList {
    .ivu-table-body {
      height: calc(100% - 16px);
    }
  }

</style>
