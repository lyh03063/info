<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>

export default {
  components: {  },
  data() {
    return {
      cfList: {
        listIndex: "list_sponsor", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "赛事赞助",
        threeTitle: "赞助商",
        flag:true,
        url: {
          list: "/crossList?page=tangball_sponsor", //列表接口
          add: "/crossAdd?page=tangball_sponsor", //新增接口
          modify: "/crossModify?page=tangball_sponsor", //修改接口
          delete: "/crossDelete?page=tangball_sponsor" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "赞助商编号",
            prop: "P1",
            width: 120
          },
          {
            label: "赞助商名称",
            prop: "name",
            width: 120
          },
          {
            label: "赞助次数",
            prop: "count",
            width: 120
          },
          {
            label: "赞助金额（单位：万元）",
            prop: "money",
            width: 200
          },
          {
            label: "赞助商简介",
            prop: "intro",
            width: 400
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赞助商编号",
            prop: "P1",
            type: "input_find_vague"

          },
          {
            label: "赞助商名称",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "赞助次数",
            prop: "count",
            type: "input"
          },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "赞助商编号",
            prop: "P1",
            
          },
          {
            label: "赞助商名称",
            prop: "name"
          },
           {
            label: "赞助次数",
            prop: "count",
          },
          {
            label: "赞助金额（单位：万元）",
            prop: "money",
          },
          {
            label: "赞助商简介",
            prop: "intro"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "赞助商名称",
            prop: "name",
            type: "input",
            width: 200
          },
           {
            label: "赞助次数",
            prop: "count",
          },
          {
            label: "赞助金额（单位：万元）",
            prop: "money",
          },
          
          {
            label: "赞助商简介",
            prop: "intro",
            type: "textarea"
          }
        ]
      }
    };
  },

};
</script>


<style>
</style>
