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
    <div class="tableList">
      <div class="tablecontent">
        <div style="padding:10px;font-weight:600;border-left:1px solid rgb(221, 222, 225);border-right:1px solid rgb(221, 222, 225);">
          <p>用户列表</p>
        </div>
        <Table :columns="columns1" size="small" :data="tableData" class="vu-table"></Table>
      </div>
    </div>
    <div style="text-align:center;">
      <Page :total="40" size="small" show-total show-sizer @on-change="pageChange" @on-page-size-change="pagesizeChange"></Page>
    </div>
  </div>
</template>
<script>
  import {
    getAssistantList,
    register
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
        columns1: [{
          title: '姓名',
          key: 'name'
        }, {
          title: '用户名',
          key: 'username'
        }, {
          title: '科目',
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
                    console.log(params.index, params.row);
                  }
                }
              }, '删除用户')
            ]);
          }
        }],
        tableData: [],
        formValidate: {
          name: '',
          subject: '',
          prespeed: '',
          speed: '',
          date: [], // 格式化时间后传到后端
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
      var obj = [{
        'name': '施艳飞',
        'subject': '初小语文 ',
        'username': 'shiyf',
        'role': 0
      }, {
        'name': '吴尘',
        'subject': '初小语文 ',
        'username': 'wuc',
        'role': 0
      }, {
        'name': '王漫琳',
        'subject': '初小语文 ',
        'username': 'wangml',
        'role': 0
      }, {
        'name': '翁飞',
        'subject': '初小语文 ',
        'username': 'wengf',
        'role': 0
      }, {
        'name': '杨雪',
        'subject': '小学数学 ',
        'username': 'yangx',
        'role': 0
      }, {
        'name': '陈柏臻',
        'subject': '小学数学 ',
        'username': 'chenbz',
        'role': 0
      }, {
        'name': '孙海迪',
        'subject': '初中数学 ',
        'username': 'sunhd',
        'role': 0
      }, {
        'name': '娄红梅',
        'subject': '初中数学 ',
        'username': 'louhm',
        'role': 0
      }, {
        'name': '张晨雪',
        'subject': '初中数学 ',
        'username': 'zhangcx',
        'role': 0
      }, {
        'name': '王昕烨',
        'subject': '初中数学',
        'username': 'wangxy',
        'role': 0
      }, {
        'name': '张月',
        'subject': '初中数学 ',
        'username': 'zhangy',
        'role': 0
      }, {
        'name': '颜小千',
        'subject': '小学英语 ',
        'username': 'yanxq',
        'role': 0
      }, {
        'name': '郑之钰',
        'subject': '小学英语 ',
        'username': 'zhengzy',
        'role': 0
      }, {
        'name': '陈琦',
        'subject': '初中英语 ',
        'username': 'chenq',
        'role': 0
      }, {
        'name': '徐景新',
        'subject': '初中英语 ',
        'username': 'xujx',
        'role': 0
      }, {
        'name': '杨全坤',
        'subject': '初中英语 ',
        'username': 'yangqk',
        'role': 0
      }, {
        'name': '于静雪',
        'subject': '初中英语 ',
        'username': 'yujx',
        'role': 0
      }, {
        'name': '王杰',
        'subject': '初中英语 ',
        'username': 'wangj',
        'role': 0
      }, {
        'name': '胡建玮',
        'subject': '初中物理 ',
        'username': 'hujw',
        'role': 0
      }, {
        'name': '董宇松',
        'subject': '初中物理 ',
        'username': 'dongys',
        'role': 0
      }, {
        'name': '黄禹衫',
        'subject': '初中物理 ',
        'username': 'huangys',
        'role': 0
      }, {
        'name': '闫文浩',
        'subject': '初中物理 ',
        'username': 'yanwh',
        'role': 0
      }, {
        'name': '李南',
        'subject': '初中化学 ',
        'username': 'lin',
        'role': 0
      }, {
        'name': '樊一',
        'subject': '初中化学 ',
        'username': 'fany',
        'role': 0
      }, {
        'name': '王延',
        'subject': '高中化学 ',
        'username': 'wangy',
        'role': 0
      }, {
        'name': '张冰冰',
        'subject': '高中化学 ',
        'username': 'zhangbb',
        'role': 0
      }, {
        'name': '吴婧',
        'subject': '高中化学 ',
        'username': 'wuj',
        'role': 0
      }, {
        'name': '葛超力',
        'subject': '高中化学 ',
        'username': 'gecl',
        'role': 0
      }, {
        'name': '韩潞鹏',
        'subject': '高中语文 ',
        'username': 'hanlp',
        'role': 0
      }, {
        'name': '李宜桐',
        'subject': ' 高中化学',
        'username': 'liyt',
        'role': 0
      }, {
        'name': '史双',
        'subject': '高中化学 ',
        'username': 'shis',
        'role': 0
      }, {
        'name': '刘亮',
        'subject': '高中数学 ',
        'username': 'liul',
        'role': 0
      }, {
        'name': '刘兵',
        'subject': ' 高中数学 ',
        'username': 'liub',
        'role': 0
      }, {
        'name': '常经伟',
        'subject': ' 高中数学 ',
        'username': 'changjw',
        'role': 0
      }, {
        'name': '孙泽众',
        'subject': ' 高中数学 ',
        'username': 'sunzz',
        'role': 0
      }, {
        'name': '周子清',
        'subject': '高中数学  ',
        'username': 'zhouzq',
        'role': 0
      }, {
        'name': '李思成',
        'subject': '高中数学  ',
        'username': 'lisc',
        'role': 0
      }, {
        'name': '王睽',
        'subject': '高中数学  ',
        'username': 'wangk',
        'role': 0
      }, {
        'name': '张明洁',
        'subject': '高中英语 ',
        'username': 'zhangmj',
        'role': 0
      }, {
        'name': '孙盟佳',
        'subject': '高中英语 ',
        'username': 'sunmj',
        'role': 0
      }, {
        'name': '韩彦欣',
        'subject': ' 高中英语',
        'username': 'hanyx',
        'role': 0
      }, {
        'name': '张雪瑶',
        'subject': ' 高中英语',
        'username': 'zhangxy',
        'role': 0
      }, {
        'name': '马瑞',
        'subject': '高中英语 ',
        'username': 'mar',
        'role': 0
      }, {
        'name': '杜昊程',
        'subject': '高中英语 ',
        'username': 'duhc',
        'role': 0
      }, {
        'name': '毕岩岩',
        'subject': ' 高中物理',
        'username': 'biyy',
        'role': 0
      }, {
        'name': '杨莉',
        'subject': ' 高中物理',
        'username': 'yangl',
        'role': 0
      }, {
        'name': '李春月',
        'subject': '高中物理 ',
        'username': 'licy',
        'role': 0
      }, {
        'name': '马赛',
        'subject': ' 高中物理',
        'username': 'mas',
        'role': 0
      }, {
        'name': '朱珍媛',
        'subject': ' 初高中生物',
        'username': 'zhuzy',
        'role': 0
      }, {
        'name': '胡燕飞',
        'subject': ' 初高中生物',
        'username': 'huyf',
        'role': 0
      }, {
        'name': '贡亚鹏',
        'subject': ' 初高中文综',
        'username': 'gongyp',
        'role': 0
      }, {
        'name': '李春秋',
        'subject': ' 初高中文综',
        'username': 'licq',
        'role': 0
      }, {
        'name': '孙辉',
        'subject': '初高中文综 ',
        'username': 'sunh',
        'role': 0
      }];
      for (let item of obj) {
        item.password = '111111';
      }
      let i = 0;
      setInterval(() => {
        register(obj[i]).then(res => {
          //   if (res.data.code === 200) {
          console.log(res);
          i++;
          //   }
        })
      }, 100);
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
      details(data) {},
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
      pageChange(page) {},
      pagesizeChange(pagesize) {}
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
      height: calc(100% - 286px);
      .tablecontent {
        height: 100%;
        border-top: 1px solid rgb(221, 222, 225);
        .vu-table {
          height: calc(100% - 28px);
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
