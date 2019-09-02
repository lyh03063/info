<template>
  <div class>
    
    <dm_list_data :cf="cfList">
      <template v-slot:slot_form_item_memberIdList="{formData}">
        <msgTransfer v-model="formData.memberIdList" url='/crossList?page=tangball_member' keyValue="name"></msgTransfer>
      </template>
    </dm_list_data>
    
  </div>
</template>
<script>
import msgTransfer from '../components/form_item/msg_transfer'

export default {
  components: { msgTransfer  },
  data() {
    return {
      cfList: {
        listIndex: "list_msg", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "消息",
        threeTitle: "消息列表",
        flag: true,
        url: {
          list: "/crossList?page=tangball_msg", //列表接口
          add: "/crossAdd?page=tangball_msg", //新增接口
          modify: "/crossModify?page=tangball_msg", //修改接口
          detail: "/crossDetail?page=tangball_msg", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_msg" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "Id",
            prop: "P1",
            width: 60
          },
          {
            label: "消息标题",
            prop: "name",
            width: 200
          },
          {
            label: "消息范围",
            prop: "range",
            width: 90,
            formatter: function (rowData) {
              if (rowData.range == 1) {
                return "全部会员";
              } else if (rowData.range == 2)  {
                return "指定会员";
              }
            }
          },
          {
            label: "指定会员id数组",
            prop: "memberIdList",
            width: 90
          },
          {
            label: "发布状态",
            prop: "publish",
            width: 90,
            formatter: function (rowData) {
              if (rowData.range == 0) {
                return "不发布";
              } else if (rowData.range == 1)  {
                return "发布";
              }
            }
          },
          {
            label: "发布时间",
            prop: "publishTime",
            width: 120
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "Id",
            prop: "P1",
            type: "input"
          },
          {
            label: "消息标题",
            prop: "name",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "Id",
            prop: "P1"
          },
          {
            label: "消息标题",
            prop: "name"
          },
          {
            label: "消息内容",
            prop: "detail"
          },
          {
            label: "消息范围",
            prop: "range"
          },
          {
            label: "指定会员id数组",
            prop: "memberIdList"
          },
          {
            label: "	发布状态",
            prop: "publish"
          },
          {
            label: "发布时间",
            prop: "publishTime"
          },
          {
            label: "其他内容",
            prop: "extend"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "消息标题 ",
            prop: "name",
            type: "input"
          },
          {
            label: "消息内容",
            prop: "detail",
            type: "textarea"
          },

          {
            label: "消息范围",
            prop: "range",
            type: "select",
            default: 1,
            options: [
              { value: 1, label: "全部会员" },
              { value: 2, label: "指定会员" }
            ]
          },

          {
            term:{range:2},
            label: "指定会员id数组",
            prop: "memberIdList",
            type: "jsonEditor",
            slot:"slot_form_item_memberIdList"
          },

          {
            label: "是否发布",
            prop: "publish",
            type: "select",
            default: 1,
            options: [
              { value: 1, label: "发布" },
              { value: 0, label: "不发布" }
            ]
          },
          {
            label: "发布时间",
            prop: "publishTime",
            type: "dateTime"
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
  methods: {}
};
</script>


<style>
</style>
