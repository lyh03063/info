<template>
  <div class>
    <!--成绩单弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="85%"
      :title="titleDialogAchievement"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogAchievement"
      v-if="showDialogAchievement"
    >
      <div class>
        <match_achievement :matchId="matchId" :debug111="true"></match_achievement>
      </div>
    </el-dialog>
    <!--报名表弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="85%"
      :title="titleDialogEnroll"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogEnroll"
      v-if="showDialogEnroll"
    >
      <div class>
        <match_enroll :matchId="matchId" :debug111="true"></match_enroll>
      </div>
    </el-dialog>
    <dm_list_data :cf="cfList">
      <!-- 成绩列插槽 (列表)-->
      <template v-slot:slot_column_enroll="{row}">
        <a href="javascript:;" class="link-blue" @click="dialogEnroll(row)">报名表</a>
      </template>
      <!-- 成绩列插槽 (列表)-->
      <template v-slot:slot_column_achievement="{row}">
        <a href="javascript:;" class="link-blue" @click="dialogAchievement(row)">成绩单</a>
      </template>
      <!-- 全国性赛事-城市场馆列表 (新增修改表单)-->
      <template v-slot:slot_form_item_cityVenueList="{formData}">
        <city_venue_list v-model="formData.cityVenueList"></city_venue_list>
      </template>
      <!-- 全国性赛事-城市场馆列表-(详情弹窗)-->
      <template v-slot:slot_detail_item_cityVenueList="{row}">
        <dm_debug_list level-up="2">
          <dm_debug_item  v-model="row.cityVenueList" text="场馆列表"/>
        </dm_debug_list>
        
        <city_venue_list v-model="row.cityVenueList" :isEdit="false"></city_venue_list>
      </template>
      <!-- 赛程联动下拉框 ,通过matchType进行初始化(新增修改表单)-->
      <template v-slot:slot_modify_item_matchProgress="{formData}">
        <select_match_progress v-model="formData.matchProgress" :matchType="formData.matchType"></select_match_progress>
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import city_venue_list from "@/components/form_item/city_venue_list.vue";
import select_match_progress from "@/components/form_item/select_match_progress.vue";
import match_achievement from "@/components/bussiness/match_achievement.vue";
import match_enroll from "@/components/bussiness/match_enroll.vue";
export default {
  components: {
    city_venue_list,
    select_match_progress,
    match_achievement,
    match_enroll
  },
  data() {
    return {
      matchId: null,
      titleDialogAchievement: "", //成绩弹窗标题
      showDialogAchievement: false, //是否显示成绩弹窗
      titleDialogEnroll: "", //报名弹窗标题
      showDialogEnroll: false, //是否显示报名弹窗
      cfList: {
        listIndex: "list_match", //vuex对应的字段
        focusMenu: true, //是否进行菜单聚焦
        twoTitle: "赛事",
        threeTitle: "赛事数据",
        flag: true,
        url: {
          list: "/crossList?page=tangball_match", //列表接口
          add: "/crossAdd?page=tangball_match", //新增接口
          modify: "/crossModify?page=tangball_match", //修改接口
          detail: "/crossDetail?page=tangball_match", //查看单条数据详情接口，在修改表单或详情弹窗用到

          delete: "/crossDelete?page=tangball_match" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "id",
            prop: "P1",
            width: 50
          },
          {
            label: "赛事名称",
            prop: "matchName",
            width: 100
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            width: 100
          },
          {
            label: "决赛场馆",
            prop: "venue",
            width: 90
          },
          {
            label: "报名人数",
            prop: "registeredPersons",
            width: 90,
            statistics: { listIndex: "list_enroll", targetIdKey: "matchId" }
          },
          {
            label: "报名费",
            prop: "registrationFee",
            width: 75
          },
          {
            label: "发布",
            prop: "publicationStatus",
            width: 75,
            formatter: function (rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "状态",
            prop: "matchStatus",
            width: 75,
            formatter: function (rowData) {
              return "赛事状态需对比开始和结束时间";

            }
          },
          {
            label: "类型",
            prop: "matchType",
            width: 75,
            formatter: function (rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          },
          {
            label: "报名表",
            // prop: "achievement",
            width: 75,
            slot: "slot_column_enroll"
          },
          {
            label: "成绩单",
            // prop: "achievement",
            width: 75,
            slot: "slot_column_achievement"
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            type: "select",
            options: [
              { label: "未开始", value: 1 },
              { label: "进行中", value: 2 },
              { label: "已结束", value: 3 }
            ]
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },
          {
            label: "赛事时间",
            prop: "matchTime",
            type: "time_period"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "赛事名称",
            prop: "matchName"
          },
          {
            label: "报名状态",
            prop: "matchErollStatus",
            formatter: function (rowData) {
              let obj = util.getTimeStatus({ start: rowData.enrollTime, end: rowData.enrollTimeEnd })
              let htmlResult = `报名时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：报名${obj.msg}`
              return htmlResult;
            }
          },
          {
            label: "赛事状态",
            prop: "matchStatus",
            formatter: function (rowData) {
              let obj = util.getTimeStatus({ start: rowData.matchTime, end: rowData.matchTimeEnd })
              let htmlResult = `比赛时间：${obj.start}&nbsp;到&nbsp;${obj.end} &nbsp;&nbsp;&nbsp;当前状态：比赛${obj.msg}`
              return htmlResult;
            }
          },
          {
            label: "发布状态",
            prop: "publicationStatus",
            formatter: function (rowData) {
              return rowData.publicationStatus == 1 ? "发布" : "未发布"; //三元表达式
            }
          },
          {
            label: "决赛场馆",
            prop: "venue"
          },
          {
            label: "报名开始时间",
            prop: "enrollTime"
          },
          {
            label: "报名结束时间",
            prop: "enrollTimeEnd"
          },

          {
            label: "赛事类型",
            prop: "matchType",
            formatter: function (rowData) {
              return rowData.matchType == 1 ? "普通赛" : "全国赛"; //三元表达式
            }
          },
          {
            label: "全国性赛事",
            prop: "cityVenueList",
            type: "select",
            slot: "slot_detail_item_cityVenueList"
          },

          {
            label: "赛事图片",
            prop: "album",
            slot: "slot_detail_item_album"
          },
          {
            label: "报名人数",
            prop: "registeredPersons"
          },
          {
            label: "报名费用",
            prop: "registrationFee"
          },
          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "赛事名称",
            prop: "matchName",
            rules: [{ required: true, message: "赛事名称不能为空" }]
          },


          {
            label: "发布状态",
            prop: "publicationStatus",
            type: "select",
            options: [{ label: "是", value: 1 }, { label: "否", value: 2 }]
          },

          {
            label: "决赛场馆",
            prop: "venue",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_venue",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "报名开始时间",
            prop: "enrollTime",
            type: "dateTime",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "报名结束时间",
            prop: "enrollTimeEnd",
            type: "dateTime",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "赛事开始时间",
            prop: "matchTime",
            type: "dateTime",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "赛事结束时间",
            prop: "matchTimeEnd",
            type: "dateTime",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "赛事类型",
            prop: "matchType",
            type: "select",
            options: [
              { label: "普通赛", value: 1 },
              { label: "全国赛", value: 2 }
            ]
          },
          {
            label: "全国赛城市场馆",
            prop: "cityVenueList",
            type: "select",
            slot: "slot_form_item_cityVenueList",
            term: { matchType: 2 }
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            type: "select",
            slot: "slot_modify_item_matchProgress"
          },
          {
            label: "相册",
            prop: "album",
            type: "upload"
          },

          {
            label: "报名费用",
            prop: "registrationFee"
          },

          {
            label: "赛事介绍",
            prop: "matchIntroduce"
          },
          {
            label: "赛事手册",
            prop: "matchManual",
            type: "textarea"
          },
          {
            label: "路线地图",
            prop: "routeMap"
          }
        ]
      }
    };
  },

  methods: {
    dialogAchievement(doc) {
      this.matchId = doc.P1;
      this.titleDialogAchievement = `【${doc.matchName}】成绩单`;
      this.showDialogAchievement = true;
    },
    dialogEnroll(doc) {
      this.matchId = doc.P1;
      this.titleDialogEnroll = `【${doc.matchName}】报名表`;
      this.showDialogEnroll = true;
    }
  }
};
</script>


