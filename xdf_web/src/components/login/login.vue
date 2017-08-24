<template>
  <div class="index">
    <Row type="flex" justify="center" align="middle">
      <Col span="24">
      <Form ref="formInline" :model="formInline" :rules="ruleInline" class="login-form">
        <Form-item prop="username">
          <div class="logo">
            <img alt="logo" src="../../assets/img/icon1.svg">
            <span>数据统计平台</span>
          </div>
          <Input type="text" v-model="formInline.username" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item prop="password">
          <Input type="password" v-model="formInline.password" placeholder="密码">
          <Icon type="ios-locked-outline" slot="prepend"></Icon>
          </Input>
        </Form-item>
        <Form-item>
          <Button type="primary" :loading="loading" @click="handleSubmit('formInline')">登录</Button>
        </Form-item>
      </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import {
  login
} from '../../services/query';
export default {
  data() {
    return {
      formInline: {
        username: '',
        password: ''
      },
      loading: false,
      ruleInline: {
        username: [{
          required: true,
          message: '请填写用户名',
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: '请填写密码',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 6,
          message: '密码长度不能小于6位',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.loading = true;
          login(this.formInline).then(res => {
            this.loading = false;
            let { data } = res;
            if (data.code === 200) {
              this.$Message.success(data.msg);
              this.$router.push({
                path: '/director'
              });
            } else if (data.code === 400) {
              this.$Message.error(data.msg);
            }
          }).catch(err => {
            this.loading = false;
            this.$Message.error('网络或服务器发生错误!');
            throw new Error(err);
          });
        } else {

        }
      })
    }
  }
}

</script>
<style scoped>
.index {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background:url('../../assets/img/login.jpg') no-repeat;
   background-size:100% 100%; 
}

.index .ivu-row-flex {
  height: 100%;
}

.login-form {
  width: 320px;
  height: 278px;
  padding: 36px;
  background:#fdfdfd;
  -webkit-box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
  margin: 0 auto;
}

.logo {
  text-align: center;
  height: 40px;
  line-height: 40px;
  cursor: pointer;
  margin-bottom: 24px;
}

.logo img {
  width: 40px;
  margin-right: 8px;
}

.logo span {
  vertical-align: text-bottom;
  font-size: 16px;
  text-transform: uppercase;
  display: inline-block;
}
</style>
