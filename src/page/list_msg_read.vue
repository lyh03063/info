<template>
  <div class>
    <dm_list_data :cf="cfList">
 <!--列表 memberId 字段插槽，注意插槽命名-->
      <template v-slot:slot_column_memberId="{row}">
        <dm_ajax_populate :id="row.memberId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </dm_ajax_populate>
      </template>
 <!--列表 msgId 字段插槽，注意插槽命名-->
      <template v-slot:slot_column_msgId="{row}">
        <dm_ajax_populate :id="row.msgId" populateKey="name" page="tangball_msg">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </dm_ajax_populate>
      </template>
    </dm_list_data>
  </div>
</template>
<script>

export default {
  components: {  },
  data() {
    return {
      cfList: {
        listIndex: "list_msg_read", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "消息",
        threeTitle: "消息已读记录列表",
        flag:true,
        url: {
          list: "/crossList?page=tangball_msg_read", //列表接口
          add: "/crossAdd?page=tangball_msg_read", //新增接口
          modify: "/crossModify?page=tangball_msg_read", //修改接口
         detail: "/crossDetail?page=tangball_msg_read", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_msg_read" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 60
          },
          {
            label: "会员id ",
            prop: "memberId",
            width: 150,
            slot:"slot_column_memberId"
          },
          
          {
            label: "消息id",
            prop: "msgId",
            width: 200,
            slot:"slot_column_msgId"
          },
          {
            label: "阅读时间",
            prop: "readTime",
            width: 100
          },
          


        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "Id",
            prop: "P1",
            type: "input"
          },
          {
            label: "会员id ",
            prop: "memberId",
            type: "input"
          },
          {
            label: "消息id",
            prop: "msgId",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "Id",
            prop: "P1"
          },
          {
            label: "会员id ",
            prop: "memberId",
            slot:"slot_column_memberId"
          },
          {
            label: "消息id",
            prop: "msgId",
            slot:"slot_column_msgId"
          },
          {
            label: "阅读时间",
            prop: "readTime",
          },
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          
          {
            label: "消息id",
            prop: "msgId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_msg",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
           {
            label: "会员id",
            prop: "memberId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_member",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "阅读时间",
            prop: "readTime",
            type: "dateTime"
          },
         
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
