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
        listIndex: "list_member", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "会员中心",
        threeTitle: "会员列表",
        flag:true,
        url: {
          list: "/crossList?page=tangball_member", //列表接口
          add: "/crossAdd?page=tangball_member", //新增接口
          modify: "/crossModify?page=tangball_member", //修改接口
          delete: "/crossDelete?page=tangball_member" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "会员号",
            prop: "P1",
            width: 80
          },
          {
            label: "会员名称",
            prop: "name",
            width: 100
          },
          {
            label: "微信号",
            prop: "openid",
            width: 100
          },
           {
            label: "性别",
            prop: "sex",
            width: 65
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 100
          },
          {
            label: "参赛次数",
            prop: "entries",
            width: 65,
            // slot:"slot_list_column_entries"
            statistics:{listIndex:'list_enroll', targetIdKey:'memberId'}
          },
           {
            label: "成绩数",
            prop: "countAchievement",
            width: 65,
            statistics:{listIndex:'list_achievement', targetIdKey:'memberId'}
          },
          {
            label: "唐球积分",
            prop: "integral",
            width: 65
          },       
          {
            label: "备注",
            prop: "remark",
            width: 65
          },
          {
            label: "职业",
            prop: "career",
            width: 50
          },
          {
            label: "球龄",
            prop: "ballAge",
            width: 65,
            formatter: function(rowData) {
              if (rowData.ballAge == 1) {
                return "一年以下";
              } else if (rowData.ballAge == 2) {
                return "一到三年";
              } else if (rowData.ballAge == 3) {
                return "三到五年";
              } else if (rowData.ballAge == 4) {
                return "五到十年";
              } else {
                return "十年以上";
              }
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "会员名称",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "身份证号",
            prop: "idCard",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "会员编号",
            prop: "P1",
          },
          {
            label: "会员名称",
            prop: "name",
          },
          {
            label: "微信号",
            prop: "openid",
          },
          {
            label: "身份证号",
            prop: "idCard",
          },
          {
            label: "参赛次数",
            prop: "entries",
          },
          {
            label: "唐球积分",
            prop: "integral",
            width: 65
          },     
          
          {
            label: "职业",
            prop: "career",
            width: 50
          },
          {
            label: "球龄",
            prop: "ballAge",
            width: 65,
            formatter: function(rowData) {
              if (rowData.ballAge == 1) {
                return "一年以下";
              } else if (rowData.ballAge == 2) {
                return "一到三年";
              } else if (rowData.ballAge == 3) {
                return "三到五年";
              } else if (rowData.ballAge == 4) {
                return "五到十年";
              } else {
                return "十年以上";
              }
            }
          },
          {
            label: "备注",
            prop: "remark",
            width: 150
          }  
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         {
            label: "会员姓名",
            prop: "name",
            width: 100
          },
          {
            label: "微信openid",
            prop: "openid",
            width: 100
          },
          {
            label: "性别",
            prop: "sex",
            type: "select",
            default:1,
            options: [{ value: 1, label: "男" }, { value: 2, label: "女" }]
          },
          {
            label: "身份证号",
            prop: "idCard",
            width: 100
          },
          {
            label: "备注",
            prop: "remark",
            width: 150
          } ,
          {
            label: "职业",
            prop: "career",
            type: "input"
          },
          {
            label: "球龄",
            prop: "ballAge",
            type: "select",
            options: [
              { label: "一年以下", value: 1 },
              { label: "一到三年", value: 2 },
              { label: "三到五年", value: 3 },
              { label: "五到十年", value: 4 },
              { label: "十年以上", value: 5 }
            ]
          }, 
        ]
      }
    };
  },

  methods: {
    
  }
};
</script>


<style>
</style>
