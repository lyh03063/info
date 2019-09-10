<template>
  <div id="app" style>
    <el-container>
      <el-header class="MB10">
        <el-row>
          <div class="FL MT13 FS24 C_fff">信息管理系统</div>
          <div class="FR MT30 C_fff">
            <span class="MR10">当前登录用户:{{this. currentUserName}}</span>
            <a href="javascript:;" class="MR10" @click="logout">退出登录</a>
            <a target="_blank" href="javascript:;">官网首页</a>
          </div>
        </el-row>
      </el-header>
    </el-container>
    <el-container>
      <NavMenu :cf="navMenuList"></NavMenu>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Vue from "vue";
import NavMenu from "./components/NavMenu/NavMenu";
export default {
  components: { NavMenu }, //注册组件
  methods: {
    // //函数：{切换调试模式函数}
    // toggleDebug() {
    //   //来自vuex的当前行数据
    //   let debug = this.$store.state.debug;
    //   console.log("debug", debug);
    //   this.$store.commit("setDebug", !debug);

    // },
    logout() {
      //退出登录函数
      localStorage.isLogin = "0";
      localStorage.loginUserName = null;
      this.$router.push({ path: "/login" }); //跳转到manage
    }
  },
  computed: {
    //计算属性

    activeMenuIndex() {
      //
      //当前激活的菜单index
      return this.$store.state.activeMenuIndex; //从vuex的store里面读取值
    }
  },
  data() {
    return {
      // 导航菜单列表

      navMenuList: [
        {
          //菜单
          index: "listHome",
          route: "/listHome",
          icon: "el-icon-house",
          title: "首页"
        },
        {
          index: "1",
          icon: "el-icon-menu",
          title: "基础数据",
          menuItem: [
            { index: "list_piece", route: "/list_piece", title: "片段" },
            { index: "list_group", route: "/list_group", title: "分组" },
            { index: "list_url", route: "/list_url", title: "网址" },
            { index: "list_file", route: "/list_file", title: "文件" },
            { index: "list_member", route: "/list_member", title: "会员" },
            { index: "list_relation", route: "/list_relation", title: "关系表" },
          ]
        },
        {
          index: "2",
          icon: "el-icon-document",
          title: "任务系统",
          menuItem: [
            
            {
              index: "list_task",
              route: "/list_task",
              title: "任务"
            },
            {
              index: "list_article",
              route: "/list_article",
              title: "文章管理"
            }
          ]
        },
       
        {
          index: "5",
          icon: "el-icon-setting",
          title: "系统管理",
          menuItem: [
            { index: "list_admin", route: "/list_admin", title: "管理员" }
          ]
        },
        {
          index: "6",
          icon: "el-icon-setting",
          title: "demo页面",
          menuItem: [
            {
              index: "dynamic_form_demo",
              route: "/dynamic_form_demo",
              title: "动态表单demo"
            },
            {
              index: "demo_common",
              route: "/demo_common",
              title: "普通组件demo"
            },
            {
              index: "listCategory",
              route: "/listCategory",
              title: "商品分类"
            },
            {
              index: "listCommodity",
              route: "/listCommodity",
              title: "商品列表"
            }
          ]
        }
      ]
    };
  },
  created() {
    //*引用当前用户名
    this.currentUserName = localStorage.loginUserName;
    document.onkeydown = e => {
      //绑定ctrl+D事件
      var keyCode = e.keyCode || e.which || e.charCode;
      var ctrlKey = e.ctrlKey || e.metaKey;
      if (ctrlKey && keyCode == 68) {
        console.log("ctrlKey", ctrlKey);
        console.log("keyCode", keyCode);
        // this.toggleDebug();//调用：{切换调试模式函数}

        let debug = this.$store.state.debug;
        console.log("debug", debug);
        this.$store.commit("setDebug", !debug);
        e.preventDefault(); //阻止默认事件
        return false;
      }
    };
  }
};
</script>

<style >
/* 单选框补丁 */
body .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #fff;
  background-color: #e6a23c;
  border-color: #e6a23c;
  -webkit-box-shadow: -1px 0 0 0 #e6a23c;
  box-shadow: -1px 0 0 0 #e6a23c;
}
</style>

