<style lang="scss" scoped>
.director-layout {
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    .layout-logo {
        width: 100px;
        height: 30px;
        float: left;
        position: relative;
        top: 11px;
        left: 20px;
        .logoimg {
            width: 100px;
            height: 30px;
        }
    }
    .layout-nav {
        width: 220px;
        float: right;
        color: #fff;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        .nav-right-logout {
            color: #fff;
        }
        .nav-right-welcome {
            padding-right: 18px;
        }
    }
    .layout-content {
        height: calc(100% - 60px);
        overflow: hidden;
        background: #000;
        .layout-content-row {
            height: 100%;
            .layout-content-col{
                height: 100%;
            }
        }
    }
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
                <i-col span="5" class="layout-content-col">
                    <Menu active-name="1-2" width="auto" :open-names="['1']">
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-navigate"></Icon>
                                导航一
                            </template>
                            <Menu-item name="1-1">选项 1</Menu-item>
                            <Menu-item name="1-2">选项 2</Menu-item>
                            <Menu-item name="1-3">选项 3</Menu-item>
                        </Submenu>
                        <Submenu name="2">
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
                        </Submenu>
                    </Menu>
                </i-col>
                <i-col span="19" class="layout-content-col">
                    <div class="layout-content-main">内容区域</div>
                </i-col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {

}
</script>
