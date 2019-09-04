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
        listIndex: "list_file", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "基础",
        threeTitle: "文件",
        flag: true,
        url: {
          list: "/crossList?page=info_file", //列表接口
          add: "/crossAdd?page=info_file", //新增接口
          modify: "/crossModify?page=info_file", //修改接口
          detail: "/crossDetail?page=info_file", //详情接口
          delete: "/crossDelete?page=info_file" //删除接口
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
            label: "说明",
            prop: "desc",
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
            label: "说明",
            prop: "desc",
          },
          {
            label: "文件上传",
            prop: "url",
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
            label: "说明",
            prop: "desc",
            type:"html"
          },
          {
            label: "文件上传",
            prop: "url",
            type: "upload"
          }
        ]
      }
    };
  }
};
</script>



