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
          <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
          <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
          <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
          <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
          <p>无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充无边框内容填充。</p>
        </div>
      </card>
    </div>
    <div style="padding: 20px;padding-top:0;">
      <div style="border-top:1px solid rgb(221, 222, 225);">
        <div style="padding:10px;font-weight:600;border-left:1px solid rgb(221, 222, 225);border-right:1px solid rgb(221, 222, 225);">
          <p>汇报列表</p>
        </div>
        <Table height="560" :columns="columns1" :data="data2"></Table>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    getAssistantList
  } from '../../services/query';
  import card from '../common/card';
  export default {
    data() {
      return {
        columns1: [{
          title: '姓名',
          key: 'name'
        }, {
          title: '年龄',
          key: 'age'
        }, {
          title: '地址',
          key: 'address'
        }],
        data2: [{
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        }, {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        }, {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        }, {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }, {
          name: '王小明',
          age: 18,
          address: '北京市朝阳区芍药居'
        }, {
          name: '张小刚',
          age: 25,
          address: '北京市海淀区西二旗'
        }, {
          name: '李小红',
          age: 30,
          address: '上海市浦东新区世纪大道'
        }, {
          name: '周小伟',
          age: 26,
          address: '深圳市南山区深南大道'
        }],
        tableData: []
      }
    },
    components: {
      card
    },
    mounted() {
      this.getList(1, 5);
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
      }
    }
  };

</script>
<style lang="scss" scoped>
  .assistantList {}

</style>
