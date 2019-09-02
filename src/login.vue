<template>
  <div>
    <div class="dialog-cover"></div>
    <div class="login-father-box" v-show="ak47">
      <div class="login-box">
        <h1>唐球后台管理登录</h1>
        <h2>管理员登录</h2>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="0"
          class="demo-ruleForm"
        >
          <el-form-item prop="userName">
            <div class>
              <el-input v-model.number="ruleForm.userName" placeholder="管理账户">
                <template slot="prepend">管理账户</template>
              </el-input>
            </div>
          </el-form-item>
          <el-form-item prop="passWord">
            <el-input v-model="ruleForm.passWord" placeholder="请输入密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="WP100" @click="submitForm('ruleForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var validateuserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入管理员账户"));
      } else {
        callback(); //通过校验
      }
    };
    var validatepassWord = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      // else if (!regpassWordword.test(value)) {
      //   callback(new Error("密码格式不合规,请设置8-20位，英文字母+数字的组合"));
      // }
      else {
        callback(); //通过校验
      }
    };

    return {
      ak47: true,
      objURL: {
        list: "/crossList?page=tangball_admin"
      },
      ruleForm: {
        //表单数据.
        userName: "",
        passWord: ""
      },
      rules: {
        //校验规则，需要定在el-form的rules属性上
        // validateuserName校验器是一个回调函数
        // trigger: "blur" 规则的触发方式，失焦事件
        userName: [{ validator: validateuserName, trigger: "blur" }],
        passWord: [{ validator: validatepassWord, trigger: "blur" }]
      },
      userLog: {}
    };
  },

  methods: {
    async adminLogin() {
      let response = await axios({
        //请求接口
        method: "post",
        url: PUB.domain+this.objURL.list,
        data: { findJson: this.ruleForm }
      }).catch(function(error) {
        alert("异常:" + error);
      });


      let { list } = response.data;
      list.forEach(element => {
        //把列表的userName循环出来做本地储存
         this.isUserName=element.userName
       
      });
     
      if (list.length > 0) {
        alert("登录成功");
        this.$router.push({ path: "/listhome" });
        localStorage.isLogin = 1;
        localStorage.loginUserName=this.isUserName//存储用户名
      } else {
        alert("请检查用户名或者密码");
        this.ruleForm = {};
      }
    },
    submitForm(formName) {
      this.$refs.ruleForm;
      this.$refs["ruleForm"];

      this.$refs.ruleForm.validate(valid => {
        //表单组件执行validate校验方法
        if (valid) {
          //如果validate为真执行以下放方法
          this.adminLogin();
        }
      });
    }
  },
  created() {

    //------------如果已经登录------------
    if (localStorage.isLogin == 1) {
      this.ak47 = false;
      // this.$message({
      //   message: "您已登录,请勿重新登录",
      //   type: "warning",
      //   duration: 1200
      // });
      setTimeout(() => {
        this.$router.push({ path: "/listHome" });
      }, 10);
      //跳转到后台首页
    }
    // } else {
    //   this.$router.push({ path: "/home" });
    // }
  },beforeMount(){
    
    console.log("挂载前$el是未定义的",this.$el)
  },mounted(){
        console.log("$el是temlate，渲染出整个div",this.$el)
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" >
.login-box {
  width: 100%;
  padding: 40px;

  h1 {
    padding: 20px 20px 20px 5px;
    font-size: 28px;
    font-weight: 400;
  }
  h2 {
    margin: 20px 20px 20px 5px;
    padding-left: 5px;
    color: #999999;
    font-size: 16px;
    font-weight: 400;
  }
}

.login-father-box {
  /*弹窗绝对居中*/
  width: 500px;
  height: 400px;
  border: 1px solid #000;
  background: #ffffff;
  margin-left: -250px;
  margin-top: -200px;
  position: fixed;
  top: 50%;
  left: 50%;
}
@media screen and (max-width: 768px) {
  .login-father-box {
    border: none;
    top: 0;
    left: 0;
    width: 100%;
    margin-top: 0;
    margin-left: 0;
  }
  .dialog-cover {
    display: none;
  }
}

.login-form {
  width: 100%;
  margin: 20px;
}
/* 遮罩层 */
.dialog-cover {
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: #f3f9fa;
  left: 0;
  top: 0;
  opacity: 0.5;
  /* display: none; */
}
</style>
