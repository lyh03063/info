<template>
  <div class>
    <!--弹出图片显示 -->
    <!-- <el-dialog
      custom-class="n-el-dialog"
      width="70%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt>
      </div>
    </el-dialog>-->

    <dm_list_data :cf="cfList">
      <template v-slot:slot_area="{formData}">
        <select_city v-model="formData.area" value-type="cityId"></select_city>
      </template>
      <!--弹出图片显示点击事件 -->
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import select_city from "@/components/form_item/select_city.vue";
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { select_city, openPhoto },
  methods: {
    // showBigImg(url) {
    //   this.showDialogBigImg = true;
    //   this.urlBigImg = url;
    // }
  },
  watch: {
    formData: {
      handler: function() {},
      deep: true //深度监听
    },
  },
  data() {
    return {
      // showDialogBigImg: false,
      options: option,
      cfList: {
        listIndex: "list_venue", //vuex对应的字段
        focusMenu: true, //进行菜单聚焦
        twoTitle: "赛事",
        threeTitle: "场馆",
        flag: true,
        url: {
          list: "/crossList?page=tangball_venue", //列表接口
          add: "/crossAdd?page=tangball_venue", //新增接口
          modify: "/crossModify?page=tangball_venue", //修改接口
          detail: "/crossDetail?page=tangball_venue", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=tangball_venue" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "编号",
            prop: "P1",
            width: 70
          },
          {
            label: "加盟商",
            prop: "franchiseeId",
            width: 100
          },
          {
            label: "场馆名称",
            prop: "name",
            width: 200
          },
          {
            label: "所属地区",
            prop: "area",
            width: 100
          },
          {
            label: "详细地址",
            prop: "address",
            width: 100
          },
          {
            label: "赛事数量",
            prop: "countMatch",
            width: 100
          },
          {
            label: "加盟时间",
            prop: "time",
            width: 130,
            formatter: function(row) {
              return moment(row.time).format("YYYY-MM-DD");
            }
          },
          {
            label: "联系方式",
            prop: "phoneNumber",
            width: 140
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "场馆编号",
            prop: "P1",
            type: "input"
          },
          {
            label: "加盟商",
            prop: "franchiseeId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_franchisee",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "加盟时间",
            prop: "time",
            type: "time_period"
          },
          {
            label: "地区",
            prop: "area"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "分类编号",
            prop: "P1"
          },
          {
            label: "加盟商",
            prop: "franchiseeId"
          },
          {
            label: "场馆名称",
            prop: "name"
          },
          {
            label: "所属地区",
            prop: "area"
          },
          {
            label: "详细地址",
            prop: "address"
          },
          {
            label: "赛事数量",
            prop: "countMatch"
          },
          {
            label: "加盟时间",
            prop: "time"
          },
          {
            label: "联系方式",
            prop: "phoneNumber"
          },
          {
            label: "相册",
            prop: "album",
            slot: "slot_detail_item_album"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          // {
          //   label: "分类编号",
          //   prop: "P1"
          // },
          {
            label: "加盟商",
            prop: "franchiseeId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_franchisee",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "场馆名称",
            prop: "name",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "所属地区",
            prop: "area",
            slot: "slot_area",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "详细地址",
            prop: "address",
            rules: [{ required: true, message: "不能为空" }]
          },
          // {
          //   label: "赛事数量",
          //   prop: "countMatch"
          // },
          {
            type: "date",
            label: "加盟时间",
            prop: "time"
          },
          {
            label: "联系方式",
            prop: "phoneNumber",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "相册",
            prop: "album",
            type: "upload"
          },
          // {
          //   label: "经度",
          //   prop: "extend",
          //   path:"longitude",
          // },
          // {
          //   label: "纬度",
          //   prop: "extend",
          //   path:"latitude",
          // },
          {
            label: "地图位置信息",
            prop: "extend",
            default:{},//默认值必须要有，否则新增的时候会出问题
            cfForm: {
              formItems: [
                {
                  label: "经度",
                  prop: "longitude"
                },
                {
                  label: "纬度",
                  prop: "latitude"
                }
              ]
            }
          },
          // {
          //   label: "纬度",
          //   prop: "extend.latitude"
          // },

          // {
          //   label: "其他",
          //   prop: "extend",
          //   type: "vueJsonEditor",

          // }
        ]
      }
    };
  }
};
</script>


<style>
</style>
