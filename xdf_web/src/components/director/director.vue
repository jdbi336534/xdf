<template>
    <div class="center-content">
        <div class="right-content-left">
            <Inputform v-show="step===1" ref="basicinfo" @commit="commitinfo" />
            <Course v-show="step===2" ref="excelinfo" @commitexcel="commitexcel" />
            <!-- <Research v-show="step===3" /> -->
        </div>
        <div class="right-content-right">
            <My-Progress />
        </div>
    </div>
</template>
<script>
import {
    directorsave,
    coursesave
} from '../../services/query';
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
            step: 1
        }
    },
    methods: {
        commitinfo(form) {
            this.$refs.basicinfo.loading = true;
            directorsave(form).then(res => {
                console.log(res.data);
                if (res.data.code === 200) {
                    this.$refs.basicinfo.loading = false;
                    // 进入到第二步
                    this.step = 2;
                }
            }).catch(err => {
                this.$refs.basicinfo.loading = false;
                this.$Message.error(err.message);
            })
        },
        commitexcel(filepath) {
            this.$refs.excelinfo.loading = true;
            coursesave({ filepath }).then(res => {
                if (res.data.code === 200) {
                    this.$refs.excelinfo.loading = false;
                    // 进入到最后一步
                    // this.step = 3;
                }
            }).catch(err => {
                this.$refs.excelinfo.loading = false;
                this.$Message.error(err.message);
            })
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

