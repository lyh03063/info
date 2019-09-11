<template>
  <div class="main-box">
    <dm_debug_list>
      <dm_debug_item v-model="groupDoc.dataType" text="groupDoc.dataType" />
      <dm_debug_item v-model="groupId" text="groupId" />
    </dm_debug_list>
<div class="PL10 PR10" >
   <list_group_data class :group-id="groupId" :data-type="groupDoc.dataType"></list_group_data>
</div>
   
  </div>
</template>
<script>
// import func from "../vue-temp/vue-editor-bridge";
import list_group_data from "@/components/common/list_group_data.vue";
export default {
  components: { list_group_data },
  data() {
    return {
      collectionListType: "table", //集合的列表形式，table或其他
      ready: false,
      breadcrumblist: [],
      activeNames: ["0"], //折叠面板的激活name数组
      groupId: this.$route.query.groupId, //分组Id
      groupDoc: {}, //分组doc
      arrId: null, //id数组
      dataList: null, //id数组
      path: null //当前路径
    };
  },
  watch: {
    //监听路由变动
    $route() {
      this.path = this.$route.path;
    },
    path() {
      console.log("路由path变动");
      if (this.path == "/group_detail") {
        this.breadcrumblist.length = 1;
      }
    }
  },
  methods: {
    /**
     * @name ajax获取分组详情和对应数据列表函数
     */

    ajaxGetList: async function() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossDetail?page=info_group`,
        data: {
          id: this.groupId
        } //传递参数
      });
      this.groupDoc = data.doc;
      this.breadcrumblist.push({
        name: this.groupDoc.name,
        path: "/#/group_detail"
      }); //面包屑导航数组添加元素

      //根据配置设置集合列表形式
      this.collectionListType = PUB.collectionType[this.groupDoc.dataType];
      this.ready = true
    }
  },
  created() {},
  beforeMount() {},
  mounted() {
    this.ajaxGetList(); //调用：{ajax获取分组详情和对应数据列表函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
