<template>
  <div class="course">
    <h2 class="course-title">四折标课情况</h2>
    <Alert> 请严格按照以下步骤执行
      <template slot="desc">
        <p>上传步骤：1.下载模板 2.填写模板 3.上传模板</p> <a style="font-size:18px;" href="http://localhost:3001/template/assistant.xlsx">点击下载模板</a>        </template>
    </Alert>
    <div class="upload">
      <Upload type="drag" action="/node/api/course" :on-success="handleSuccess" :before-upload="handleBeforeUpload" :on-remove="handleRemove">
        <div style="padding: 20px 0">
          <Icon type="ios-cloud-upload" size="52" style="color: #3399ff" :show-upload-list="false"></Icon>
          <p>点击或将文件拖拽到这里上传(四折标课Excel)</p>
        </div>
      </Upload>
    </div>
    <div class="upload-result" style="height:400px;" >
    <div v-if="showtable">
      <p class="result-title">上传结果如下：共{{data2.length}}条</p>
      <Table height="360" :columns="columns1" :data="data2" size="small" stripe></Table>
      <Form>
      <Form-item class="btngroup">
        <Button type="primary" :loading="loading" @click="handleSubmit">保存</Button> </Form-item>
    </Form>
      </div>
      
    </div>
    
  </div>
</template>
<script>
  import {} from '../../services/query';
  export default {
    data() {
      return {
        columns1: [{
          title: '校区',
          key: 'campus'
        }, {
          title: '助理主管',
          key: 'assistant',
        }, {
          title: '教师姓名',
          key: 'teacher',
        }, {
          title: '学生姓名',
          key: 'student',
        }, {
          title: '是否续费',
          key: 'isrenew',
        }, {
          title: '补救措施',
          key: 'measures',
          ellipsis: true
        }],
        data2: [],
        fileList: [],
        showtable: false,
        loading: false,
        filepath: ''
      }
    },
    methods: {
      handleSuccess(res, file, fileList) {
        try {
          if (res.code === 200) {
            this.data2 = res.data;
            this.fileList = fileList;
            this.filepath = res.filepath;
            this.showtable = true;
          }
        } catch (err) {
          this.data2 = [];
          this.$Message.error(err.message);
        }
      },
      handleBeforeUpload(file) {
        console.log(this.$cookie.get('xdf_user'));
        if (file.type !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          this.$Message.warning('上传文件的格式错误，只能上传excel文件');
          return false;
        }
        if (this.fileList.length > 0) {
          this.$Message.warning('请在列表中删除已上传的文件后再上传');
          return false;
        }
      },
      handleRemove(file, fileList) {
        this.showtable = false;
        this.data2 = [];
        this.fileList = fileList;
      },
      handleSubmit() {
        if (this.fileList.length < 1) {
          this.$Message.warning('请上传文件后再保存');
          return;
        } else {
          this.$emit('commitexcel', this.filepath);
        }
      }
    }
  };

</script>
<style lang="scss" scoped>
  .course {
    width: 100%;
    padding: 0 20px;
    margin: 10px auto;
    .course-title {
      text-align: center;
      border-bottom: 1px solid #666;
      padding: 10px 0;
      margin-bottom: 40px;
    }
    .upload {
      width: 600px;
      height:150px;
      margin: 0 auto;
    }
    .result-title {
      font-size: 14px;
      padding: 20px 0;
    }
    .btngroup {
      text-align: center;
      margin-top: 30px;
    }
  }

</style>
