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
        listIndex: "listOrder", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        url: {
          list: "/crossList?page=mabang-order", //列表接口
          add: "/crossList?page=mabang-order", //新增接口
          modify: "/crossList?page=mabang-order", //修改接口
          delete: "/crossList?page=mabang-order" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "订单ID",
            prop: "P1",
            width: 80
          },
          {
            label: "用户名",
            prop: "userName",
            width: 140
          },
          {
            label: "订单状态",
            prop: "state",
            width: 150
          },
          {
            label: "备注信息",
            prop: "leaveMsg",
            width: 150
          },
          {
            label: "拓展信息",
            prop: "extend.aaa",
            width: 150
          },

        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
           {
            label: "用户名",
            prop: "userName",
            type: "input"
          },
          {
            label: "订单编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "订单状态",
            prop: "status",
            type: "select",
            options: [
              { label: "已下单,未付款", value: "1" },
              { label: "已付款,未发货", value: "2" },
              { label: "已发货", value: "3" },
              { label: "已完成", value: "4" },
              { label: "已取消", value: "5" },
            ]
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "商品名称",
            prop: "name"
          },
          {
            label: "商品数量",
            prop: "byCount"
          },
          {
            label: "商品价格",
            prop: "price"
          },
          {
            label: "运费",
            prop: "freight"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "分类名称",
            prop: "name",
            type: "input"
          },
          {
            label: "注释",
            prop: "remark",
            type: "textarea"
          }
        ],
      }
    };
  },

};
</script>


<style>
</style>
