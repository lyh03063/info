<template>
  <div>
    <dm_space height="10"></dm_space>
    <dm_debug_list>
      <dm_debug_item v-model="groupId" text="groupId" />
      <dm_debug_item v-model="dataType" text="dataType" />
      <dm_debug_item v-model="formDataModify" text="formDataModify" />
    </dm_debug_list>
    <el-button plain @click="dialogAddData" size="mini" v-if="isEdit">新增并引用</el-button>
    <dm_list_data :cf="cfList" ref="listDataMain">
      <!--标题列插槽组件-->
      <template v-slot:slot_column_name="{row}">
        <div class v-if="row&&row.doc">{{row.doc.name}}</div>
      </template>

      <!--操作实体数据列组件-->
      <template v-slot:slot_column_operate="{row}">
        <div class v-if="row">
          <el-button plain size="mini" @click="dialogModifyData(row.dataId)">修改</el-button>
        </div>
      </template>
    </dm_list_data>

    <!--新增数据弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="新增数据"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogAdd"
      v-if="showDialogAdd"
    >
      <dm_dynamic_form
        :cf="cfFormAdd"
        v-model="formDataAdd"
        @submit="submitAddForm"
        @cancel="showDialogAdd=false"
      ></dm_dynamic_form>
    </el-dialog>

    <!--修改数据弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="修改数据"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogModify"
      v-if="showDialogModify"
    >
      <dm_dynamic_form
        :cf="cfFormAdd"
        v-model="formDataModify"
        @submit="submitModifyForm"
        @cancel="showDialogModify=false"
      ></dm_dynamic_form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  mixins: [MIX.form_item], //混入
  //groupId不传的话，不启动独立的数据保存
  props: ["groupId", "dataType"],
  data() {
    return {
      isEdit: true, //是否开启编辑
      /****************************新增/修改数据相关数据-START****************************/
      cfFormAdd: {
        formItems: PUB.listCF.info_piece.formItems,
        btns: [
          { text: "提交", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      formDataAdd: {}, //需要新增的表单数据
      formDataModify: {}, //需要修改的表单数据
      showDialogAdd: false, //是否显示新增数据弹窗
      idModify:null,//需要修改的数据Id
      showDialogModify: false, //是否显示修改数据弹窗
      /****************************新增/修改数据相关数据-END****************************/

      cfList: lodash.cloneDeep(PUB.listCF.info_relation_simple) //主列表配置
    };
  },

  computed: {},

  methods: {
    /**
     * @name 显示新增数据弹窗函数
     */

    dialogModifyData: async function(dataId) {

      this.idModify=dataId;
      this.showDialogModify = true;
      this.formDataModify = {}; //清空新增表单数据

      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossDetail?page=${this.dataType}`,
        data: {
          id: dataId
        } //传递参数
      });
      this.formDataModify = data.doc;
    },
    /**
     * @name 显示新增数据弹窗函数
     */

    dialogAddData: function() {
      // alert("dialogAddData");
      this.showDialogAdd = true;
      this.formDataAdd = {}; //清空新增表单数据
    },
    /**
     * @name 提交添加数据表单函数
     */
    submitAddForm: async function() {
      let { data } = await axios({
        method: "post",
        url: `${PUB.domain}/crossAdd?page=${this.dataType}`,
        data: { data: this.formDataAdd } //将新增数据传进接口中
      });
      this.$message.success("新增成功");

      let { addData } = data;

      /**
       * 新增一条数据到关系表，取最大序号
       */
      {
        let { data } = await axios({
          method: "post",
          url: `${PUB.domain}/crossAdd?page=info_relation`,
          data: {
            data: {
              groupId: this.groupId,
              dataId: addData.P1,
              dataType: this.dataType,
              //序号，获取第一条数据的序号加一，这个并不准确（在分页时）
              sort:
                lodash.get(this.$refs.listDataMain, `tableData[0].sort`, 99) + 1
            }
          } //将新增数据传进接口中
        });
        this.$message.success("新增关系数据成功");
      }

      //如果{主列表}存在
      if (this.$refs.listDataMain) {
        this.$refs.listDataMain.getDataList(); //更新列表
      }

      this.showDialogAdd = false; //关闭弹窗
    },
    /**
     * @name 提交修改数据表单函数
     */
    submitModifyForm: async function() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossModify?page=${this.dataType}`,
        data: {
          findJson: {
            P1: this.idModify
          },
          modifyJson: this.formDataModify
        }
      });
      this.$message.success("修改成功");

    


      //如果{主列表}存在
      if (this.$refs.listDataMain) {
        this.$refs.listDataMain.getDataList(); //更新列表
      }

      this.showDialogModify = false; //关闭弹窗
    }
  },

  created() {
    this.cfList.findJsonDefault = { groupId: this.groupId };
    this.cfList.sortJsonDefault = { sort: -1 };

    this.cfList.dynamicDict = [
      {
        page: "info_piece",
        populateColumn: "doc",
        idColumn: "dataId",
        idColumn2: "P1"
      }
    ];
  },
  mounted() {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
.data-group {
  position: relative;
  font-size: 12px;
  height: 26px;
  line-height: 26px;
  background-color: #f0f0f0;
  margin: 0 0 10px 0;
  padding: 0 6px;
  overflow: hidden;
}

.data-group.edit {
  height: auto;
  padding: 0 0;
}
.tool-bar {
  position: absolute;
  right: 0px;
  top: 0;
  height: 100%;
  background: rgba(3, 3, 3, 0.5);

  color: #fff;
  padding: 0 10px;
}

.btn-op {
  padding: 3px 3px;

  cursor: pointer;
}
.btn-op:hover {
  color: yellow;
}

.data-form-group {
  height: auto;
  background-color: transparent;
  border: 1px #ddd dashed;
  border-radius: 5px;
  padding: 10px 10px 10px 8px;
}

.data-form-group .tool-bar {
  height: 24px;
  line-height: 24px;
  left: 0;
  right: auto;
  border-bottom-right-radius: 10px;
}

.data-group2 {
  padding: 5px 10px;
  border-bottom: 1px dashed #ddd;
}
</style>
