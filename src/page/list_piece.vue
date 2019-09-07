<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    filterActicle(categoryId) {
      //函数：{筛选文章函数}

      this.$store.commit("setListFindJson", {
        //改变列表的初始状态值
        listIndex: "list_article",
        findJson: { articleCategory: categoryId }
      });
      this.$router.push({ path: "/list_article" });
    }
  },
  data() {
    return {
      cfList: PUB.listCF.info_piece
    };
  }
};
</script>



