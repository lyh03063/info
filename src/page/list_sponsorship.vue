<template>
  <div class>
    <dm_list_data :cf="cfList">
    <!--详情弹窗的category字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_sponsorId="{row}">
        <dm_ajax_populate :id="row.sponsorId" populateKey="name" page="tangball_sponsor">
          <template v-slot:default="{doc}" >
            <div class v-if="doc && doc.P1"><b>{{doc.P1}}</b>(赞助商名称:{{doc.name}})</div>
          </template>
        </dm_ajax_populate>
      </template>

         <!--详情弹窗的category字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_matchId="{row}">
        <dm_ajax_populate :id="row.matchId" populateKey="matchName" page="tangball_match">
          <template v-slot:default="{doc}" >
            <div class v-if="doc && doc.P1"><b>{{doc.P1}}</b>(赛事名称:{{doc.matchName}})</div>
          </template>
        </dm_ajax_populate>
      </template>

       <template v-slot:slot_place="{formData}">
        <select_city v-model="formData.place" valueType="cityId"></select_city>
      </template>

      </dm_list_data>
  </div>
</template>
<script>

import select_city from "@/components/form_item/select_city.vue";
export default {
  components: { select_city},
  data() {
    return {
      cfList: {
        listIndex: "list_sponsorship", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "赛事赞助",
        threeTitle: "赛事赞助",
        flag: true,
        url: {
          list: "/crossList?page=tangball_sponsorship", //列表接口
          add: "/crossAdd?page=tangball_sponsorship", //新增接口
          modify:
            "/crossModify?page=tangball_sponsorship", //修改接口
          delete:
            "/crossDelete?page=tangball_sponsorship" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "id",
            prop: "P1",
            width: 60
          },
          {
            label: "赞助商id",
            prop: "sponsorId",
            width: 90,
             slot: "slot_detail_item_sponsorId",
          },
          {
            label: "赛事id",
            prop: "matchId",
            width: 80,
             slot: "slot_detail_item_matchId",

          },
          //  {
          //   label: "赛事名称",
          //   prop: "matchName",
          //   width: 80
          // },
          {
            label: "赞助金额",
            prop: "amount",
            width: 100
          },
          {
            label: "赞助时间",
            prop: "time",
            width: 110,
             formatter: function(row) {
              return moment(row.time).format("YYYY-MM-DD ");
            }
          },
          {
            label: "地点",
            prop: "place",
            width: 110
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
        
           {
            label: "赞助商id",
            prop: "sponsorId",
             type: "input"
          },
          {
            label: "赛事id",
            prop: "matchId",
             type: "input"
          },
           {
            label: "赞助时间",
            prop: "time",
             type: "time_period"
          },
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "id",
            prop: "P1"
          },
          {
            label: "赞助商id",
            prop: "sponsorId",
            slot:"slot_detail_item_sponsorId"
          },
          {
            label: "赛事id",
            prop: "matchId",
             slot:"slot_detail_item_matchId"
          },
          {
            label: "赞助金额",
            prop: "amount"
          },
          {
            label: "赞助时间",
            prop: "time"
          },
          {
            label: "地点",
            prop: "place"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
         
          {
            label: "赞助商id",
            prop: "sponsorId",
            type: "select",
            ajax: {
              url: "/crossList?page=tangball_sponsor",
              keyLabel: "name",
              keyValue: "P1"
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
            }
          },
          //   {
          //   label: "赛事名称",
          //   prop: "matchName",
          //   width: 80
          // },
          {
            label: "赞助金额",
            prop: "amount",
            type: "input",
           
          },
          {
            label: "赞助时间",
            prop: "time",
            type: "date",
           
          },
          {
            label: "地点",
            prop: "place",
             slot: "slot_place"
          }
        ]
      }
    };
  }
};
</script>


<style>
</style>
