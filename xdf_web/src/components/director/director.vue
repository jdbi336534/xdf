<style scoped>
/* .director-layout {
    width: 100%;
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
} */

.center-content {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    color: #000;
    background: #F3F3F3;
}

.right-content-left {
    width: calc(100% - 346px);
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    background: #fff;
}

.right-content-right {
    width: 336px;
    height: 100%;
    float: left;
    background: #fff;
}
</style>
<template>
                    <div class="center-content">
                        <div class="right-content-left">
                            <Inputform />
                        </div>
                        <div class="right-content-right">
                            预留
                        </div>
                    </div>
</template>
<script>
import Inputform from './input';
export default {
    components: {
        Inputform
    },
    data() {
        return {
           
        }
    }
}
</script>

