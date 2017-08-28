<template>
  <div>
    <Inputform v-show="step===1" ref="basicinfo" @commit="commitinfo" />
    <Course v-show="step===2" ref="excelinfo" @commitexcel="commitexcel" /> </div>
</template>
<script>
  import {
    directorsave,
    coursesave
  } from '../../services/query';
  import {
    setSessionStore
  } from '@/assets/js/mUtils';
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
    created() {
      setSessionStore('defaultActive', '/report/assdirector');
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
        coursesave({
          filepath
        }).then(res => {
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


</style>
