<template>
  <div class>
    <dm_list_data :cf="cfList"></dm_list_data>
  </div>
</template>
<script>
// import Mock from 'mockjs'
// Mock.mock('/login', function () {
// let loginList=[
//   {P1:1,userName:"admin",passWord:"aa"},
//   {P1:2,userName:"admin",passWord:"aa"},
// ]
// return loginList
// })

export default {
  components: {  },
  data() {
    return {
      cfList: {
        listIndex: "listCategory", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "系统管理",
        threeTitle: "管理员",
        flag:true,
        url: {
          // list:"/list_login",
          list: "/crossList?page=tangball_admin", //列表接口
          add: "/crossAdd?page=tangball_admin", //新增接口
          modify: "/crossModify?page=tangball_admin", //修改接口
          delete: "/crossDelete?page=tangball_admin" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "用户名",
            prop: "userName",
            width: 200
          },
          {
            label: "密码",
            prop: "passWord",
            width: 200
          },
           {
            label: "昵称",
            prop: "nickName",
            width: 200
          },
          {
            label: "数据id",
            prop: "P1",
            width: 200
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "数据id",
            prop: "P1",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "用户名",
            prop: "userName"
          },
          {
            label: "密码",
            prop: "passWord"
          },
          {
            label: "数据id",
            prop: "P1"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "用户名",
            prop: "userName",
            type: "input"
          },
          {
            label: "密码",
            prop: "passWord",
            type: "input"
          },
          {
            label: "昵称",
            prop: "nickName",
            type: "input"
          },
        ]
      }
    };
  },

};
</script>


<style>
</style>
