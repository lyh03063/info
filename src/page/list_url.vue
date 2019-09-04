<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
export default {
  components: {},
  methods: {
    
  },
  data() {
    return {
      cfList: {
        listIndex: "list_url", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "基础",
        threeTitle: "网址",
        flag: true,
        url: {
          list: "/crossList?page=info_url", //列表接口
          add: "/crossAdd?page=info_url", //新增接口
          modify: "/crossModify?page=info_url", //修改接口
          detail: "/crossDetail?page=info_url", //详情接口
          delete: "/crossDelete?page=info_url" //删除接口
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
            label: "网址",
            prop: "url",
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
            label: "网址",
            prop: "url",
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
            label: "网址",
            prop: "url",
            type: "input"
          }
        ]
      }
    };
  }
};
</script>



