<template>
  <div class>
    <!--xxx弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="城际赛个人成绩明细"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialog"
      v-if="showDialog"
    >
      <div class>
        <dm_debug_list level-up="1">
          <dm_debug_item v-model="findJsonDefault"  text="成绩列表的默认查询参数"/>
          <dm_debug_item v-model="cfList.formDataAddInit"  text="新增表单的初始数据"/>
          <dm_debug_item v-model="cfList.formItems[0].ajax.param.sheetRelation.findJson" text="弹窗表单的第一个字段的下拉框选项ajax查询参数"
          />
          <dm_debug_item v-model="info" text="展示的一些信息"/>
        </dm_debug_list>

        <div class="OFH">
          <div class="FL FWB FS16 LH30">【{{info.cityName}}】代表队的【{{info.progressName}}】成绩明细表</div>

          <div class="FR">
            <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
            <el-button type="primary" size="mini" @click="isEdit=true" v-if="!isEdit">编辑</el-button>
          </div>
        </div>
        <dm_list_data
          :cf="cfList"
          @after-add="$emit('after-add')"
          @after-modify="$emit('after-modify')"
        >
          <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
          <template v-slot:slot_detail_item_participantsId="{row}">
            <dm_ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
              <template v-slot:default="{doc}">
                <div class v-if="doc && doc.P1">
                  {{doc.P1}}
                  (
                  {{doc.name}})
                </div>
              </template>
            </dm_ajax_populate>
          </template>
          <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
          <template v-slot:slot_detail_item_matchId="{row}">
            <dm_ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
              <template v-slot:default="{doc}">
                <div class v-if="doc && doc.P1">
                  {{doc.P1}}
                  (
                  {{doc.matchName}})
                </div>
              </template>
            </dm_ajax_populate>
          </template>

          <!-- 赛程联动下拉框 ,通过matchId进行初始化-->
          <template v-slot:slot_modify_item_matchProgress="{formData}">
            <select_match_progress
              v-model="formData.matchProgress"
              :matchType="formData.matchType"
              :matchId="formData.matchId"
            ></select_match_progress>
          </template>
        </dm_list_data> 
      </div>
    </el-dialog>
  </div>
</template>
<script>


import select_match_progress from "@/components/form_item/select_match_progress.vue";
import match_venue from "@/components/form_item/match_venue.vue";
export default {
  components: { select_match_progress, match_venue },
  props: {
    matchId: [String, Number],
    findJsonDefault: [Object],
    show: [Boolean],
    info: [Object]
  },
  //混入成绩列表配置
  mixins: [

    MIX.list.list_achievement,
    MIX.list.list_achievement_simple
  ],
  data() {
    return {

      isEdit: false, //是否编辑状态
      showDialog: this.show,
      arrCrossCityMatchAchievement: [], //城际赛成绩列表
      arrCrossCityMatchPersonAchievement: [], //城际赛成绩明细总列表
      crossCityMatchSmallProgress: 21, //城际赛赛段id聚焦值
      cityMatchVenuId: null, //城市赛场馆选项卡的聚焦值
      cityMatchProgress: 11, //城市赛阶段选项卡的聚焦值
      matchInfo: null, //赛事信息
      cfList: {
        focusMenu:false,
        // isShowSearchForm: false, //隐藏查询表单
        // isShowBreadcrumb: false, //隐藏面包屑导航
        // isShowPageLink: false, //隐藏分页
        // isShowOperateColumn: false, //隐藏操作列
        // isShowToolBar: false, //隐藏工具栏
        //默认查询参数
        findJsonDefault: this.findJsonDefault,
        //新增表单初始赋值
        formDataAddInit: {},
        //vuex对应的字段---注意这里不能和其他列表重复
        listIndex: "match_achievement_crosscity",
        //-------列配置数组-------

        //-------新增、修改表单字段数组-------
        formItems11111: [
          {
            label: "参赛人",
            prop: "participantsId",
            type: "select",

            ajax: {
              url: "/crossListRelation",
              keyLabel: "name",
              keyValue: "P1",

              param: {
                needRelation: "1",
                columnItem: "memberId",
                columnTarget: "P1",
                sheetRelation: {
                  page: "tangball_enroll",
                  findJson: {
                    matchId: this.findJsonDefault.matchId,
                    cityVenueId: null
                  }
                },
                sheetTarget: {
                  page: "tangball_member",
                  pageSize: "2000",
                  findJson: {}
                }
              }
            }
          },

          {
            label: "赛事ID",
            prop: "matchId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_match",
              keyLabel: "matchName",
              keyValue: "P1"
            },
            hide: true
          },
          {
            label: "赛事阶段",
            prop: "matchProgress",
            type: "select",
            slot: "slot_modify_item_matchProgress",
            hide: true
          },
          {
            label: "杆数",
            prop: "matchScore",
            type: "input"
          }
        ]
      }
    };
  },
  watch: {
    isEdit: {
      handler(newVal, oldVal) {
        if (this.isEdit) {
          //如果{000}000
          this.cfList.isShowToolBar = true;
          this.cfList.isShowOperateColumn = true;
        } else {
          this.cfList.isShowToolBar = false;
          this.cfList.isShowOperateColumn = false;
        }
      }
    },
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    show: {
      handler(newVal, oldVal) {
        this.showDialog = this.show;
      },
      immediate: true //组件初始化时立即执行一次变动
      // deep: true //深度监听
    },
    showDialog: {
      handler(newVal, oldVal) {

        this.$emit("update:show", this.showDialog); //同步外部的show
      },
      immediate: true //组件初始化时立即执行一次变动
      // deep: true //深度监听
    },
    findJsonDefault: {
      handler(newVal, oldVal) {
        // //同步更新新增表单初始数据
        // this.formDataAddInit.matchId = this.findJsonDefault.matchId;
        // this.formDataAddInit.cityVenueId = this.findJsonDefault.cityVenueId;
        // this.formDataAddInit.matchProgress = {
        //   bigProgress: 2,
        //   smallProgress: this.findJsonDefault["matchProgress.smallProgress"]
        // };

        this.cfList.formDataAddInit = {
          matchId: this.findJsonDefault.matchId,
          cityVenueId: this.findJsonDefault.cityVenueId,
          matchProgress: {
            bigProgress: 2,
            smallProgress: this.findJsonDefault["matchProgress.smallProgress"]
          }
        };

        //修改人员下拉框的ajax参数，不同场馆对应着不同的报名人员
        this.cfList.formItems[0].ajax.param.sheetRelation.findJson.cityVenueId = this.findJsonDefault.cityVenueId;
        this.cfList.formItems[0].ajax.param.sheetRelation.findJson.matchId = this.findJsonDefault.matchId;
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  methods: {},
  created() { }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
