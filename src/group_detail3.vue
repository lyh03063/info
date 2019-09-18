<template>
  <div class="main-box">
    <dm_debug_list>
      <dm_debug_item v-model="groupDoc" text="groupDoc" />
      <dm_debug_item v-model="groupDoc.dataType" text="groupDoc.dataType" />
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="listMenu" text="listMenu" />
      <dm_debug_item v-model="groupIdTarget" text="groupIdTarget" />
    </dm_debug_list>
    <!-- :router="true" -->
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-submenu
        :index="item.P1+''"
        v-for="(item,index) in listMenu"
        :key="item.P1"
        @open="enterMenu"
      >
        <template slot="title">
          <span class @mouseenter="enterMenu(item,index)">{{item.name}}</span>
        </template>
        <template v-if="item.sonMenu&&item.sonMenu.length">
          <el-menu-item
            :index="sonItem.P1+''"
            v-for="sonItem in item.sonMenu"
            :key="sonItem.P1"
          >{{sonItem.name}}</el-menu-item>
        </template>
      </el-submenu>
      <!-- :route="`/group_detail?groupId=${sonItem.P1}`" -->
      <dm_space height="10"></dm_space>
      <group_detail :group-id-prop="groupIdTarget" v-if="ready"></group_detail>

      <!-- <router-view></router-view> -->
    </el-menu>
  </div>
</template>
<script>
// import func from "../vue-temp/vue-editor-bridge";
import group_detail from "@/group_detail";
export default {
  components: { group_detail },
  data() {
    return {
      groupIdTarget: 5,
      listMenu: [
        {
          P1: "1",
          name: "菜单1",
          sonMenu: [
            { P1: "1_1", name: "菜单1-1" },
            { P1: "1_2", name: "菜单1-2" }
          ]
        },
        { P1: "2", name: "菜单2" }
      ],
      activeIndex: "1",
      ready: false,
      dataList: null,
      groupId: this.$route.query.groupId, //分组Id
      groupDoc: {}, //分组doc
      arrId: null //id数组
    };
  },

  methods: {
    /**
     * @name 鼠标进入菜单函数
     */
    enterMenu: async function(item, index) {
      if (item.dataType != "info_group") return; //如果不是分组类型不，跳出
      if (item.sonMenu) return; //如果子菜单已加载，跳出
      //此处冗余可优化***
      let arrId = item.arrId.map(doc => doc.id);
      {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/crossList?page=info_group`,
          data: {
            findJson: { P1: { $in: arrId } }
          } //传递参数
        });

        item.sonMenu = data.list; //补充子菜单
        this.listMenu = lodash.cloneDeep(this.listMenu);
      }
      console.log("enterMenu-3");
    },
    async handleSelect(key, keyPath) {
      console.log("key:", key);
      console.log("keyPath:", keyPath);
      this.ready = false;
      this.groupIdTarget = key;
      await util.timeout(100); //延迟,这里需优化
      this.ready = true;
    },
    /**
     * @name ajax获取分组详情和对应数据列表函数
     */

    ajaxGetDoc: async function() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossDetail?page=info_group`,
        data: {
          id: this.groupId
        } //传递参数
      });
      this.groupDoc = data.doc;

      if (this.groupDoc.dataType != "info_group") return; //如果不是分组类型不，跳出
      let arrId = this.groupDoc.arrId.map(doc => doc.id);
      {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/crossList?page=info_group`,
          data: {
            findJson: { P1: { $in: arrId } }
          } //传递参数
        });

        this.listMenu = data.list;
      }

      this.ready = true;
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.ajaxGetDoc(); //调用：{ajax获取分组详情和对应数据列表函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
