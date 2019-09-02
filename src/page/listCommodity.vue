<template>
  <div class>
    <!--显示大图弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="75%"
      title="显示大图"
      :close-on-press-escape="false"
      v-bind:visible.sync="showDialogBigImg"
      v-if="showDialogBigImg"
    >
      <div class="TAC">
        <img :src="urlBigImg" alt>
      </div>
    </el-dialog>

    <dm_list_data :cf="cfList">
      <!--详情弹窗的album字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_album="{row}">
        <div class v-if="row.album && row.album.length">
          <img
            @click="showBigImg(item.url)"
            :src="item.url"
            alt
            v-for="item in row.album"
            :key="item.url"
            class="W100 H100"
          >
        </div>
      </template>
      <!--详情弹窗的description字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_description="{row}">
        <div class="FWB C_f30" @click="print(row.description)">{{row.description}}</div>
      </template>
      <!--详情弹窗的category字段组件，注意插槽命名-->
      <template v-slot:slot_detail_item_category="{row}">
        <dm_ajax_populate :id="row.category" populateKey="name" page="mabang-category">
          <template v-slot:default="{doc}">
            <div class v-if="doc && doc.P1"><b>{{doc.name}}</b>(分类id:{{doc.P1}})</div>
          </template>
        </dm_ajax_populate>
      </template>

      <!--弹窗表单的description字段插槽组件-->
      <template v-slot:slot_form_item_description="{formData}">
        <form_item_test class v-model="formData.description"></form_item_test>
      </template>

<!--列表的category字段插槽组件-->
      <template v-slot:slot_list_column_category="{row}">
        <dm_ajax_populate :id="row.category" populateKey="name" page="mabang-category"></dm_ajax_populate>
     
      </template>
    </dm_list_data>
  </div>
</template>
<script>
import form_item_test from "@/components/form_item_test.vue";

export default {
  components: {  form_item_test },
  methods: {
    showBigImg(url) {
      this.showDialogBigImg = true;
      this.urlBigImg = url;
    },
    print(text) {
      alert(text);
    }
  },
  data() {
    return {
      showDialogBigImg: false, //是否显示大图弹窗
      urlBigImg: "", //大图地址
      cfList: {
        listIndex: "listProduct", //vuex对应的字段
        focusMenu:true,//进行菜单聚焦
        twoTitle: "商品中心",
        threeTitle: "商品列表",
        flag: true,
        url: {
          list: "/crossList?page=mabang-commodity", //列表接口
          add: "/crossAdd?page=mabang-commodity", //新增接口
          modify: "/crossModify?page=mabang-commodity", //修改接口
          detail: "/crossDetail?page=mabang-commodity", //查看单条数据详情接口，在修改表单或详情弹窗用到
          delete: "/crossDelete?page=mabang-commodity" //删除接口
        },
        //-------列配置数组-------
        columns: [
          {
            label: "商品id",
            prop: "P1",
            width: 80,
            formatter:function(){
              return "aaaa"
            }
          },
          {
            label: "商品名称",
            prop: "name",
            width: 200,
           
          },
          {
            label: "价格",
            prop: "price",
            width: 70
          },
          {
            label: "运费",
            prop: "freight",
            width: 70
          },
          {
            label: "库存",
            prop: "store",
            width: 70
          },
          {
            label: "分类编号",
            prop: "category",
            width: 70,
             slot:"slot_list_column_category"
          },
          {
            label: "属性",
            prop: "prop",
            width: 100
          }
        ],
        //-------筛选表单字段数组-------
        searchFormItems: [
          {
            label: "商品id",
            prop: "P1",
            type: "input"
          },
          {
            label: "商品名称1",
            prop: "name",
            type: "input_find_vague"
          },
          {
            label: "商品分类",
            prop: "category",
            type: "select",
            ajax: {
              url: "/crossList?page=mabang-category",
              keyLabel: "name",
              keyValue: "P1"
            }
          }
        ],
        //-------详情字段数组-------
        detailItems: [
          {
            label: "商品id",
            prop: "P1",
            width: 100
          },
          {
            label: "商品名称",
            prop: "name",
            width: 100
          },
          {
            label: "商品简介",
            prop: "description",
            width: 100,
            slot: "slot_detail_item_description"
          },
          {
            label: "商品详情",
            prop: "detail",
            width: 100
          },
          {
            label: "价格",
            prop: "price",
            width: 100
          },
          {
            label: "运费",
            prop: "freight",
            width: 100
          },
          {
            label: "库存",
            prop: "store",
            width: 100
          },
          {
            label: "商品分类",
            prop: "category",
            width: 100,
            slot: "slot_detail_item_category"
          },
          {
            label: "属性",
            prop: "prop",
            width: 100
          },
          {
            label: "图片",
            prop: "album",
            width: 100,
            slot: "slot_detail_item_album"
            //   formatter(row) {
            //     //自定义格式
            //     let htmlResult = ""; //需要拼装的html代码
            //     if (row.album && row.album.length) {
            //       //如果相册数组存在
            //       row.album.forEach(albumEach => {
            //         //循环：{相册数组}
            //         htmlResult += `<img  class="F1 W100 H100" src="${
            //           albumEach.url
            //         }" alt="" >`;
            //       });
            //     }
            //     return htmlResult;
            //   }
          }
        ],
        //-------新增、修改表单字段数组-------
        formItems: [
          {
            label: "商品名称",
            prop: "name",
            type: "input",
            rules: [{ required: true, message: "不能为空" }]
          },
          {
            label: "商品分类",
            prop: "category",
            type: "select",
            ajax: {
              url: "/crossList?page=mabang-category",
              keyLabel: "name",
              keyValue: "P1"
            }
          },
          {
            label: "商品简介",
            prop: "description",
            type: "input",
            slot: "slot_form_item_description"
          },
          {
            label: "商品详情",
            prop: "detail",
            type: "select",
            ajax: {
              url: "/crossList?page=mabang-member",
              keyLabel: "nickName",
              keyValue: "userName"
            }
          },
          {
            label: "价格",
            prop: "price",
            type: "input"
          },
          {
            label: "运费",
            prop: "freight",
            type: "input"
          },
          {
            label: "库存",
            prop: "store",
            type: "input"
          },
          {
            label: "图片",
            prop: "album",
            type: "upload"
          },
          {
            label: "其他数据",
            prop: "extend",
            type: "vueJsonEditor"
          },
          {
            label: "属性",
            prop: "prop",
            type: "vueJsonEditor"
          }
        ]
      }
    };
  },
 
};
</script>


<style>
</style>
