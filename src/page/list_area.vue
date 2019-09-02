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
        //默认排序参数
        sortJsonDefault: {
          "tangball.countVenue": -1//按场馆数量降序
        },
        listIndex: "list_area", //vuex对应的字段
        focusMenu: true,//进行菜单聚焦
        flag: true,
        url: {
          list: "/crossList?page=dmagic_area", //列表接口
          add: "/crossAdd?page=dmagic_area", //新增接口
          modify: "/crossModify?page=dmagic_area", //修改接口
          delete: "/crossDelete?page=dmagic_area" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "地区名称",
            prop: "P2",
            width: 200
          },
          {
            label: "地区编号",
            prop: "P7",
            width: 200
          },
          {
            label: "父地区编号",
            prop: "P8",
            width: 150
          },
          {
            label: "场馆数",
            prop: "tangball",
            width: 100,
            formatter: function (rowData) {
              if (!rowData.tangball) return "";
              return rowData.tangball.countVenue
            }

          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "地区名称",
            prop: "P2",
            type: "input_find_vague"
          }, {
            label: "分类编号",
            prop: "P7",
            type: "input"
          }, {
            label: "父地区编号",
            prop: "P8",
            type: "input"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "地区名称",
            prop: "P2",
          },
          {
            label: "地区编号",
            prop: "P7",
          },
          {
            label: "父地区编号",
            prop: "P8",
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "地区名称",
            prop: "P2",
            type: "input"
          },
          {
            label: "地区编号",
            prop: "P7",
            type: "input"
          }, {
            label: "父地区编号",
            prop: "P8",
            type: "input"
          }
        ]
      }
    };
  },

};
</script>


<style>
</style>
