<template>
  <div>
    <el-aside class="ML10" :style="[isCollapse?open:close]">
      <div
        class="C_fff TAR PR10 bar"
        style="background:rgb(84, 92, 100);border-bottom:1px solid #999"
        @click="isCollapseFun"
        :style="[isCollapse?open1:close]"
      >
        <span v-if="isCollapse">&gt; &gt;</span>
        <span v-else>&lt; &lt;</span>
      </div>
      <el-menu
        :default-active="activeMenuIndex"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :router="true"
        :collapse="isCollapse"
      >
        <template v-for="(menuEach,index) in cf">
          <el-menu-item
            :index="menuEach.index"
            :route="menuEach.route"
            v-if="menuEach.route"
            :key="index"
          >
            <i :class="menuEach.icon"></i>
            <span slot="title">{{menuEach.title}}</span>
          </el-menu-item>

          <el-submenu :index="menuEach.index" :key="index" v-else>
            <template slot="title">
              <i :class="menuEach.icon"></i>
              <span>{{menuEach.title}}</span>
            </template>

            <el-menu-item
              style="padding-left:77px;"
              :index="item.index"
              :route="item.route"
              v-for="item in menuEach.menuItem"
              :key="item.index"
            >{{item.title}}</el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </el-aside>
  </div>
</template>

<script>
export default {
  props: ["cf"],
  methods: {
    isCollapseFun() {
      this.isCollapse = !this.isCollapse;
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
      open: {
        width: "80px"
      },
      close: {
        width: "202px"
      },
      open1: {
        width: "64px"
      },
      isCollapse: false
    };
  }
};
</script >
<style scoped>
ul {
  margin: 0;
  padding: 0;
}
.bar {
  cursor: pointer;
}
.el-aside {
  overflow: hidden;
}

</style>



