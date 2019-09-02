<template>
  <div class>
    <dm_list_data :cf="cfList">
      <!-- 城市赛场馆(新增/修改表单) -->
      <template v-slot:slot_form_item_matchInfo="{formData}">
        <member_enroll
          v-model="formData.cityVenueId"
          :matchId="formData.matchId"
          :memberId="formData.participantsId"
        ></member_enroll>
      </template>
      <!--详情弹窗的 participantsId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_participantsId="{row}">
        <dm_ajax_populate :id="row.participantsId" populateKey="name" page="tangball_member">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
          </template>
        </dm_ajax_populate>
      </template>
      <!--详情弹窗的 matchId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <dm_ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.matchName}})
          </template>
        </dm_ajax_populate>
      </template>
      <!--详情弹窗的 cityVenueId 字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_cityVenueId="{row}">
        <dm_ajax_populate :id="row.cityVenueId" populateKey="name" page="tangball_venue">
          <template v-slot:default="{doc}">
            {{doc.P1}}
            (
            {{doc.name}})
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
      <template v-slot:slot_detmember_enrollail_item_matchProgress="row">
        <achievement_matchProgress :matchProgress="row.row.matchProgress" ></achievement_matchProgress>
      </template>
      <template v-slot:slot_detail_item_matchProgress="row">
        <achievement_matchProgress :matchProgress="row.row.matchProgress" ></achievement_matchProgress>
      </template>
      
    </dm_list_data>
  </div>
</template>
<script>


import select_match_progress from "@/components/form_item/select_match_progress.vue";
import member_enroll from "@/components/form_item/member_enroll.vue";
import achievement_matchProgress from "@/components/form_item/achievement_matchProgress.vue";
export default {
  components: { select_match_progress, member_enroll,achievement_matchProgress },
  mixins: [MIX.list.list_achievement],
  data() {
    
    return {
      cfList: {
        
        //-------列配置数组-------
        columns1111: [
          {
            label: "参赛人Id-88888",
            prop: "participantsId",
            slot: "slot_detail_item_participantsId",
            width: 120
          },

         
        ],
       
      }
    };
  },
 
  methods: {}
};
</script>


<style scoped>

</style>
