<template>
  <div class="main-box">
    <div class="clear breadcrumb-box">
      <el-breadcrumb separator="/">
        <!-- :to="{ path: '/' }" -->
        <el-breadcrumb-item v-for="(doc,i) in breadcrumblist" :key="i">
          <a :href="doc.path||'javascript:;'">{{doc.name}}</a>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="当前分组Id" />
      <dm_debug_item v-model="groupDoc" text="当前分组doc" />
      <dm_debug_item v-model="groupDoc.arrId" text="当前分组的关联数据id数组" />
      <dm_debug_item v-model="dataList" text="dataList" />
    </dm_debug_list>
    <div class="LH40 FS18 TAC">{{groupDoc.name}}</div>
    <router-view v-if="path=='/piece_detail'"></router-view>
    <div class v-else style="padding:10px">
      <collection_id
        ref="collection"
        class
        :list-type="collectionListType"
        v-model="groupDoc.arrId"
        :data-type="groupDoc.dataType"
        :group-id="groupDoc.P1"
        v-if="ready"
        @after-add="afterAddData"
        @after-delete="refreshList"
        @after-modify="refreshList"
      ></collection_id>
    </div>
  </div>
</template>
<script>
// import func from "../vue-temp/vue-editor-bridge";
import collection_id from "@/components/form_item/collection_id.vue";
export default {
  components: { collection_id },
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
     * @name refreshList刷新列表函数
     */
    refreshList: async function() {
      this.$refs.collection.ajaxGetList(); //调用：{ajax获取分组详情和对应数据列表函数}
    },
    /**
     * @name 内部列表新增数据后的回调函数
     */
    afterAddData: async function(doc) {
      console.log("doc", doc);
      this.groupDoc.arrId.unshift({ id: doc.P1 }); //将新增数据的Id加入到this.groupDoc.arrId
      this.arrId = this.groupDoc.arrId.map(doc => doc.id); //更新arrId

      //将该id写入当前分组的arrId中
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossModify?page=info_group`,
        data: {
          findJson: {
            P1: this.groupId
          },
          modifyJson: { arrId: this.groupDoc.arrId }
        }
      });
      this.refreshList(); //调用：{刷新列表函数}
    },
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
      if (!this.groupDoc) return (this.ready = true); //如果groupDoc不存在,return
      if (!this.groupDoc.arrId) {
        this.groupDoc.arrId = [];
      }

      {
        this.arrId = this.groupDoc.arrId.map(doc => doc.id);
        if (!this.arrId.length) {
          //如果{000}000
          this.arrId = [];
        }

        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/crossList?page=${this.groupDoc.dataType}`,
          data: {
            findJson: { P1: { $in: this.arrId } }
          } //传递参数
        });

        this.dataList = data.list;
        this.ready = true; //数据加载完毕
      }
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
.breadcrumb-box {
  padding: 5px 10px;
  background-color: #f0f0f0;
}
</style>
