<template>
  <div class="main-box">
    <dm_debug_list>
      <dm_debug_item v-model="doc" text="doc" />
      <dm_debug_item v-model="dataId" text="dataId" />
    </dm_debug_list>

    <div class="LH50 FS20 TAC">{{doc.name}}</div>

    <div class="content-box" v-html="doc.content"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      doc: {}, //文档
      dataId: null
    };
  },

  methods: {
    /**
     * @name ajax获取片段详情函数
     * 
     */
    getData: async function() {
      let dataId = this.$route.query.id;
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossDetail?page=info_piece`,
        data: {
          id: dataId
        } //传递参数
      });
      this.doc = data.doc;

      console.log("this.$route", this.$route);
    }
  },
  created() {},
  beforeMount() {},
  async mounted() {
    this.getData();//调用：{ajax获取片段详情函数}
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.main-box {
}
.content-box {
  font-size: 14px;
  padding: 10px;
}
</style>
