<template>
  <div class>
    <dm_list_data :cf="cfList">
      <!--自定义复选框插槽组件-->
      <template v-slot:slot_form_item_arrid="{formData}">
       <list_id class="" v-model="formData.arrId" ></list_id>
      </template>

    </dm_list_data>
  </div>
</template>
<script>
import list_id from '@/components/form_item/list_id.vue'
export default {
  components: {list_id},
  methods: {},
  data() {
    return {
      cfList: {
        listIndex: "list_group", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "基础",
        threeTitle: "组",
        flag: true,
        url: {
          list: "/crossList?page=info_group", //列表接口
          add: "/crossAdd?page=info_group", //新增接口
          modify: "/crossModify?page=info_group", //修改接口
          detail: "/crossDetail?page=info_group", //详情接口
          delete: "/crossDelete?page=info_group" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "编号",
            prop: "P1",
            width: 100
          },
          {
            label: "组名",
            prop: "name",
            width: 220
          },
          {
            label: "数据类型",
            prop: "sheet",
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
            label: "组名",
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
            label: "组名",
            prop: "name"
          },
          {
            label: "说明",
            prop: "desc",
            type: "html"
          },
          {
            label: "数据类型",
            prop: "sheet"
          },
          {
            label: "数据id数组",
            prop: "arrId"
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
            label: "数据类型",
            prop: "sheet",
            type: "select",
            default: "Sheet224",
            options: [
              { value: "Sheet224", label: "片段" },
              { value: "Sheet225", label: "组" },
              { value: "Sheet227", label: "文件" },
              { value: "Sheet226", label: "网址" }
            ]
          },
          {
            label: "说明",
            prop: "desc",
            type: "textarea"
          },
          {
            label: "数据id",
            prop: "desc",
            type: "textarea",
            slot: "slot_form_item_arrid"
          },
         
        ]
      }
    };
  }
};
</script>



