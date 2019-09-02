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
        listIndex: "list_franchisee", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "赛事",
        threeTitle: "加盟商",
        flag:true,
        url: {
          list: "/crossList?page=tangball_franchisee", //列表接口
          add: "/crossAdd?page=tangball_franchisee", //新增接口
          modify: "/crossModify?page=tangball_franchisee", //修改接口
         detail: "/crossDetail?page=tangball_franchisee", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_franchisee" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 60
          },
          {
            label: "企业名称",
            prop: "name",
            width: 200
          },
          {
            label: "场馆数",
            prop: "countVenue",
            width: 75,
            // slot:"slot_list_column_countVenue"
            statistics:{listIndex:'list_venue', targetIdKey:'franchiseeId'}
          },
           {
            label: "加盟时间",
            prop: "joinTime",
            width: 100,
            // formatter:function(row){
              
            //  return moment(row.joinTime).format("YYYY-MM-DD")

            // }
          },
          {
            label: "备注",
            prop: "remark",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "Id",
            prop: "P1",
            type: "input"
          },{
            label: "加盟时间",
            prop: "joinTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "Id",
            prop: "P1"
          },
          {
            label: "企业名称",
            prop: "name"
          },
          {
            label: "备注",
            prop: "remark"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "企业名称",
            prop: "name",
            type: "input"
          },
    
          {
            label: "加盟时间",
            prop: "joinTime",
            type: "date"
          },
          {
            label: "备注2",
            prop: "remark",
            type: "input"
          }
        ]
      }
    };
  },
  methods: {
   
  },

};
</script>


<style>
</style>
