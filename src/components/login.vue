<template>
  <div class="back_image">
    <div class="login_box">
      <el-form ref="Form" :model="Form" class="form_in" :rules="rules">
        <!--账号-->
        <el-form-item prop="username">
          <el-input v-on:input="change" v-model="Form.username" prefix-icon="el-icon-user-solid" placeholder="请输入账号"></el-input>
        </el-form-item>
        <!--密码-->
        <el-form-item prop="password">
          <el-input v-model="Form.password" prefix-icon="el-icon-lock" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <!--记住密码-->
        <el-checkbox v-model="Form.remenber">记住密码</el-checkbox>
        <!--按钮-->
        <el-form-item class="form_button">
          <el-button type="primary" plain @click="Login">登录</el-button>
          <el-button type="info" plain @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      Form: {
        username: '',
        password: '',
        remenber:true,
      },
      rules: {
        username: [
          {required: true, message: '请输入账号', trigger: 'blur'},
          {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      },
    }
  },
  methods: {
    //重置登录表单
    resetLoginForm() {
      this.$refs.Form.resetFields();
    },
    //登录按钮
    Login: function () {
      //预验证
      let form = this.Form
      let username = form.username
      let password = form.password
      this.$refs.Form.validate(valid => {
        console.log(valid)
        if (valid) {
          if (username === 'admin' && password === 'admin') {
            console.log('输入正确')
            //将登录成功的状态存入缓存
            if (this.Form.remenber) {
              let obj = JSON.stringify(form)
              //如果选择记住密码，将账号和密码存缓存
              window.localStorage.setItem("form", obj)
            }
            window.sessionStorage.setItem("token", "success")
            this.$message.success("登录成功")
            this.$router.push("home")
          } else {
            this.$message.error('密码错误')
          }
        } else {
          this.$message.warning("登录失败")
        }

      })
    },
    //监听账号输入操作,如果输入账号，自动输入密码
    change:function (){
      let username = this.Form.username
      let form= JSON.parse(localStorage.getItem("form"))
      if (username === "admin"){
        this.Form.password = form.password
      }
    }
  },

}
</script>

<style scoped>
.back_image {
  width: auto;
  height: 100%;
  background-image: url("../assets/image/backgrounimage.jpeg");
  background-size: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  /*opacity: 0.5; /*设置透明度*/
  background: rgba(255, 255, 255, .5);
}

/*登录按钮*/
.form_button {
  display: flex;
  justify-content: flex-end;
}

.form_in {
  position: absolute;
  top: 50px;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
</style>