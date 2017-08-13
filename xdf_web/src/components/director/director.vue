<template>
    <div class="center-content">
        <div class="right-content-left">
              <!-- <Inputform />   -->
               <Course />   
               <!-- <Research />   -->
        </div>
        <div class="right-content-right">
            <My-Progress />
        </div>
    </div>
</template>
<script>
import Inputform from './input';
import MyProgress from './progress';
import Course from './course';
import Research from './research';
export default {
    components: {
        Inputform,
        MyProgress,
        Course,
        Research
    },
    data() {
        return {

        }
    }
}
</script>
<style scoped>
.center-content {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    color: #000;
    background: #F3F3F3;
}

.right-content-left {
    width: calc(100% - 346px);
    min-height: 100%;
    margin-right: 10px;
    margin-bottom: 10px;
    float: left;
    background: #fff;
}

.right-content-right {
    width: 336px;
    padding: 20px;
    /* height: 100%; */
    float: left;
    background: #fff;
}
</style>

