<template>
  <div class>
   
    <dm_list_data :cf="cfList">
    </dm_list_data>
  </div>
</template>
<script>

export default {
  components: {  },
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
      cfList: {
        listIndex: "list_article_category", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "赛事",
        threeTitle: "文章分类",
        flag: true,
        url: {
          list:
            "/crossList?page=tangball_article_category", //列表接口
          add:
            "/crossAdd?page=tangball_article_category", //新增接口
          modify:
            "/crossModify?page=tangball_article_category", //修改接口

          delete:
            "/crossDelete?page=tangball_article_category" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "分类编号",
            prop: "P1",
            width: 100
          },
          {
            label: "分类名称",
            prop: "name",
            width: 120
          },
          {
            label: "分类说明",
            prop: "remark",
            width: 250,
          },
          {
            label: "文章数量",
            prop: "acticleNumber",
            width: 90,
            statistics:{listIndex:'list_article', targetIdKey:'articleCategory'}
          },
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "分类编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "分类编号",
            prop: "name",
            type: "input"
          },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "分类编号",
            prop: "P1"
          },
          {
            label: "分类名称",
            prop: "name"
          },
          {
            label: "分类说明",
            prop: "remark"
          },
          {
            label: "该分类下的文章总量",
            prop: "articleNumber"
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类名称",
            prop: "name",
            type: "input"
          },
          {
            label: "分类说明",
            prop: "remark",
            type: "textarea"
          }
        ]
      }
    };
  }
};

</script>


<style>
.article-text:hover{
  color:blue
}
.article-text{
  cursor: pointer;
}
</style>
