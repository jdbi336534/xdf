<style lang="scss" scoped>
  .director-layout {
    width: 100%;
    min-width: 1280px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    .ivu-menu-horizontal {
      height: 50px;
      line-height: 50px;
    }
    .dropmenu {
      color: #bbb;
    }
    .dropmenu:hover {
      color: #57a3f3;
    }
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    float: left;
    position: relative;
    top: 11px;
    left: 20px;
  }

  .logoimg {
    width: 100px;
    height: 30px;
  }

  .layout-nav {
    width: 220px;
    float: right;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .nav-right-logout {
    color: #fff;
  }

  .nav-right-welcome {
    padding-right: 18px;
  }

  .layout-content {
    height: calc(100% - 50px);
    overflow: hidden;
  }

  .layout-content-row,
  .layout-content-col,
  .menu {
    height: 100%;
  }

  .right-content {
    background: #F3F3F3;
    overflow-y: auto;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
   .center-content {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    color: #000;
    background: #F3F3F3;
  }

  .right-content-left {
    width: 100%;
    min-height: 100%;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    background: #fff;
  }

</style>
<template>
  <div class="director-layout">
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo"> <img class="logoimg" src="http://images.xdf.cn/cms20150819/img/images/logo.png"></img>
      </div>
      <div class="layout-nav">
        <Dropdown> <a href="javascript:void(0)" class="dropmenu">
            {{name}}
            <Icon type="arrow-down-b"></Icon>
        </a>
          <DropdownMenu slot="list">
            <DropdownItem>修改密码</DropdownItem>
            <DropdownItem>注销登录</DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <!--  <span class="nav-right-welcome">你好！蒋东兵</span>
                <Button type="ghost" shape="circle" icon="power" class="nav-right-logout"></Button>--></div>
    </Menu>
    <div class="layout-content">
      <Row class="layout-content-row">
        <i-col span="4" class="layout-content-col">
          <Menu width="auto" :active-name="defaultActive" :open-names="open" class="menu" @on-select="handleSelectMenu" accordion>
            <Submenu name="report">
              <template slot="title">
                <Icon type="ios-navigate"></Icon> 工作汇报 </template>
              <Menu-item name="/report/director">主管汇报</Menu-item>
              <Menu-item name="/report/assistant">助理主管汇报</Menu-item>
              <!-- <Menu-item name="1-2">四折标课统计</Menu-item>
                                <Menu-item name="1-3">面招培情况统计</Menu-item>
                                <Menu-item name="1-4">教研情况统计</Menu-item> -->
            </Submenu>
            <Submenu name="status">
              <template slot="title">
                <Icon type="ios-keypad"></Icon> 工作情况 </template>
              <Menu-item name="/status/director">主管汇报结果</Menu-item>
              <Menu-item name="/status/assistantList">助理主管汇报结果</Menu-item>
            </Submenu>
            <!-- <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon> 导航三 </template>
              <Menu-item name="3-1">选项 1</Menu-item>
              <Menu-item name="3-2">选项 2</Menu-item>
            </Submenu> -->
          </Menu>
        </i-col>
        <i-col span="20" class="layout-content-col right-content">
          <div class="center-content">
            <div class="right-content-left">
              <router-view></router-view>
            </div>
          </div>
        </i-col>
      </Row>
    </div>
  </div>
</template>
<script>
  import {
    getSessionStore
  } from '@/assets/js/mUtils';
  export default {
    data() {
      return {
        defaultActive: this.$route.path,
        name: '',
        open: []
      }
    },
    watch: {
      $route(to, from) {
        this.getwhichOpen(to.path);
      }
    },
    created() {
      this.getwhichOpen(this.$route.path);
    },
    mounted() {
      this.name = getSessionStore('DisplayName');
    },
    methods: {
      getwhichOpen(path) {
        // 获取当前页面的路由，并是相应菜单展开且高亮
        let arr = [];
        arr.push(path.split('/')[1]);
        this.open = arr;
      },
      handleSelectMenu(path) {
        this.$router.push({
          path: path
        })
      }
    }
  }

</script>
