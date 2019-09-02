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
      cfList: {
        listIndex: "list_piece", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "基础",
        threeTitle: "片段",
        flag: true,
        url: {
          list: "/crossList?page=info_piece", //列表接口
          add: "/crossAdd?page=info_piece", //新增接口
          modify: "/crossModify?page=info_piece", //修改接口
          detail: "/crossDetail?page=info_piece", //详情接口
          delete: "/crossDelete?page=info_piece" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "编号",
            prop: "P1",
            width: 100
          },
          {
            label: "标题",
            prop: "name",
            width: 120
          },
          {
            label: "内容",
            prop: "content",
            width: 250
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "标题",
            prop: "name",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "编号",
            prop: "P1"
          },
          {
            label: "标题",
            prop: "name"
          },
          {
            label: "内容",
            prop: "content",
            type:"html"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "标题",
            prop: "name",
            type: "input"
          },
          {
            label: "内容",
            prop: "content",
            type: "editor"
          },
          {
            label: "相册",
            prop: "album",
            type: "upload"
          }
        ]
      }
    };
  }
};
</script>



