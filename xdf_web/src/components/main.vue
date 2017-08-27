<style scoped>
.director-layout {
    width: 100%;
    min-width: 1280px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
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
    height: calc(100% - 60px);
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
</style>
<template>
    <div class="director-layout">
        <Menu mode="horizontal" theme="dark" active-name="1">
            <div class="layout-logo">
                <img class="logoimg" src="http://images.xdf.cn/cms20150819/img/images/logo.png"></img>
            </div>
            <div class="layout-nav">
                <span class="nav-right-welcome">你好！蒋东兵</span>
                <Button type="ghost" shape="circle" icon="power" class="nav-right-logout"></Button>
            </div>
        </Menu>
    
        <div class="layout-content">
            <Row class="layout-content-row">
                <i-col span="4" class="layout-content-col">
                    <Menu active-name="1-2" width="auto" :active-name="defaultActive" class="menu" @on-select="handleSelectMenu">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                报表统计
                            </template>
                            <Menu-item name="/director">汇报统计</Menu-item>
                            <!-- <Menu-item name="1-2">四折标课统计</Menu-item>
                                <Menu-item name="1-3">面招培情况统计</Menu-item>
                                <Menu-item name="1-4">教研情况统计</Menu-item> -->
                        </Submenu>
                        <!-- <Submenu name="2">
                                <template slot="title">
                                    <Icon type="ios-keypad"></Icon>
                                    导航二
                                </template>
                                <Menu-item name="2-1">选项 1</Menu-item>
                                <Menu-item name="2-2">选项 2</Menu-item>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-analytics"></Icon>
                                    导航三
                                </template>
                                <Menu-item name="3-1">选项 1</Menu-item>
                                <Menu-item name="3-2">选项 2</Menu-item>
                            </Submenu> -->
                    </Menu>
                </i-col>
                <i-col span="20" class="layout-content-col right-content">
                    <router-view></router-view>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
import { getSessionStore } from '@/assets/js/mUtils';
export default {
    data() {
        return {
            defaultActive: '/director'
        }
    },
    mounted() {
        this.defaultActive = getSessionStore('defaultActive') || this.$route.path;
    },
    methods: {
        handleSelectMenu(path) {
            this.$router.push({
                path: path
            })
        }
    }
}
</script>

