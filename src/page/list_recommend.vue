<template>
  <div class>
    <dm_list_data :cf="cfList">
      <template v-slot:slot_detail_item_album="{row}">
        <openPhoto v-model="row.album"></openPhoto>
        <!-- <div>
          <img
            @click.stop="showBigImg(item.url)"
            :src="item.url"
            alt
            v-for="item in row.album"
            :key="item.url"
            class="W100 H100"
          >
        </div>-->
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import openPhoto from "@/components/common/openPhoto/openPhoto.vue";
export default {
  components: { openPhoto },
  data() {
    return {
      cfList: {
        listIndex: "list_recommend", //vuex对应的字段~
        focusMenu: true, //进行菜单聚焦
        twoTitle: "其他数据",
        threeTitle: "首页轮播图",

        url: {
          list: "/crossList?page=tangball_recommend", //列表接口
          add: "/crossAdd?page=tangball_recommend", //新增接口
          modify: "/crossModify?page=tangball_recommend", //修改接口
          detail: "/crossDetail?page=tangball_recommend",
          delete: "/crossDelete?page=tangball_recommend" //删除接口
        },
        dynamicDict: [
          {
            page: "tangball_article_category",
            populateColumn: "categoryDoc",
            idColumn: "articleCategory",
            idColumn2: "P1"
          }
        ],

        //-------列配置数组-------
        columns: [
          {
            label: "标题",
            prop: "name",
            width: 260
          },
          {
            label: "链接页面",
            prop: "link",
            width: 250
          },

          {
            label: "创建时间",
            prop: "CreateTime",
            width: 145
          },
          {
            label: "其他",
            prop: "extend",
            width: 135,
            formatter: function(extend) {
              return JSON.stringify(extend.extend);
            }
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "标题",
            prop: "name",
            type: "input_find_vague"
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "标题",
            prop: "name"
          },
          {
            label: "链接页面",
            prop: "link"
          },

          {
            label: "图片",
            prop: "album",
            slot: "slot_detail_item_album"
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "文章标题",
            prop: "name"
          },
          {
            label: "小程序页面",
            prop: "link"
          },
          {
            label: "相册",
            prop: "album",
            type: "upload"
          },
        ]
      }
    };
  }
};
</script>


<style>
</style>
