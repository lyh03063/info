<template>
  <div class>
    <div class>
      <el-button plain @click="dialogAddData" size="mini" v-if="isEdit">新增并引用</el-button>
      <el-button plain @click="dialogList" size="mini" v-if="isEdit">从已有数据引用</el-button>
      <div class="FR MR10" v-if="groupId&&listType!='table'">
        <el-button plain @click="isEdit=true" size="mini" v-if="!isEdit">编辑</el-button>
        <el-button plain @click="isEdit=false" size="mini" v-if="isEdit">取消编辑</el-button>
        <el-button @click="saveData" size="mini" v-if="isEdit" type="primary">保存</el-button>
      </div>
    </div>

    <dm_debug_list>
      <dm_debug_item v-model="dictData" text="dictData" />
      <dm_debug_item v-model="dataList" text="dataList" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
      <dm_debug_item v-model="dataType" text="数据类型" />
    </dm_debug_list>
    <!-- v-if="valueNeed && valueNeed.length"这个条件在空数组添加数据时报错 -->
    <div class>
      <dm_space height="8"></dm_space>
      <ul v-if="isEdit">
        <li
          v-for="(doc,i) in valueNeed"
          :key="i"
          :class="{'data-group':true}"
          @mouseenter="focusItem=i"
          @mouseleave="focusItem=999"
        >
          <div class v-if="dictData[doc.id]">
            <span>{{doc.id}}:{{dictData[doc.id].name}}</span>
            <div class="tool-bar" v-if="isEdit">
              <i class="el-icon-top btn-op" title="置顶" @click="move(i, 'top')" v-if="i>0"></i>
              <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')" v-if="i>0"></i>

              <i
                class="el-icon-bottom btn-op"
                title="下移"
                @click="move(i, 'down')"
                v-if="i<valueNeed.length-1"
              ></i>
              <i
                class="el-icon-bottom btn-op"
                title="置底"
                @click="move(i, 'bottom')"
                v-if="i<valueNeed.length-1"
              ></i>
              <!-- <i class="el-icon-edit btn-op" title="编辑"></i>
              <i class="el-icon-copy-document btn-op" title="复制"></i>-->
              <i class="el-icon-delete btn-op" title="删除" @click="deleteData(i)"></i>
            </div>
          </div>
        </li>
      </ul>

      <!--任务-->
      <div class v-else-if="listType=='table'">
        <dm_list_data
          ref="listDataMain"
          :cf="cfDataList"
          @after-add="(data)=>{$emit('after-add',data)}"
          @after-modify="(data)=>{$emit('after-modify',data)}"
          @after-delete="$emit('after-delete')"
        ></dm_list_data>
      </div>

      <div class="data-group2" v-for="(doc,i) in dataList" :key="i" v-else>
        <!--片段-->
        <a @click="gotoDetail(doc)" href="javascript:;" v-if="dataType=='info_piece'">{{doc.name}}</a>
        <!--网址-->
        <a :href="doc.url" target="_blank" v-else-if="dataType=='info_url'">{{doc.name}}</a>
        <!--分组-->
        <a
          :href="'/#/group_detail?groupId='+doc.P1"
          target="_blank"
          v-else-if="dataType=='info_group'"
        >{{doc.name}}</a>
        <!--文件-->
        <a
          :href="$lodash.get(doc, 'url[0].url')"
          target="_blank"
          v-else-if="dataType=='info_file'"
        >{{doc.name}}</a>
      </div>
    </div>
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
    <!--选择数据列表弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="95%"
      title="选择数据"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="showDialogList"
      v-if="showDialogList"
    >
      <dm_list_data :cf="cfList" ref="listData">
        <!--分组-查看分组详情列插槽组件-->
        <template v-slot:slot_column_name="{row}" v-if="dataType=='info_group'">
          {{row.name}}
        </template>
      </dm_list_data>
      <div class="TAC">
        <el-button type="primary" @click="selectData">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// action="https://jsonplaceholder.typicode.com/posts/"
export default {
  mixins: [MIX.form_item], //混入
  //groupId不传的话，不启动独立的数据保存
  props: ["dataType", "groupId", "listType"],
  data() {
    return {
      cfDataList: lodash.get(PUB, `listCF.${this.dataType}_simple`), //表格型数据列表配置
      isEdit: false, //是否开启编辑
      page: null, //页面类型
      cfList: null, //选择数据列表配置
      cfFormAdd: {
        formItems: PUB.listCF.info_piece.formItems,
        btns: [
          { text: "提交", event: "submit", type: "primary", validate: true },
          { text: "取消", event: "cancel" }
        ]
      },
      formDataAdd: {}, //需要新增的表单数据
      showDialogAdd: false, //是否显示新增数据弹窗
      showDialogList: false, //是否显示数据选择列表弹窗
      dictData: {},
      dataList: [],
      focusItem: "999"
    };
  },
  watch: {
    dataType: {
      handler(newName, oldName) {
        this.ajaxGetList(); //调用：{ajax获取对应列表数据函数}
        this.cfList = PUB.listCF[this.dataType]; //选择列表的配置更新
        this.cfFormAdd.formItems = lodash.get(
          PUB,
          `listCF.${this.dataType}.formItems`
        ); //新增数据的表单配置更新
      },
      immediate: true
    },
    value: {
      handler(newName, oldName) {
        if (!this.value) {
          //
          this.valueNeed = [];
        }
      },
      immediate: true,
      deep: true
    }
  },
  computed: {},

  methods: {
    /**
     * @name 跳转到详情页面的函数
     */
    gotoDetail: function(doc) {
      this.$router.push({ path: `/piece_detail?id=${doc.P1}` });
      //父组件的面包屑导航数组添加元素
      this.breadcrumblist.length = 1;
      this.breadcrumblist.push({ name: doc.name });
    },
    /**
     * @name 保存数据函数
     */
    saveData: async function() {
      let { data } = await axios({
        //请求接口
        method: "post",
        url: `${PUB.domain}/crossModify?page=info_group`,
        data: {
          findJson: {
            P1: this.groupId
          },
          modifyJson: { arrId: this.valueNeed }
        }
      });
      this.$message.success("保存成功");
      this.isEdit = false;
    },
    /**
     * @name 提交添加数据表单函数
     */
    submitAddForm: async function() {
      // 请求新增附件的接口
      let { data } = await axios({
        method: "post",
        url: `${PUB.domain}/crossAdd?page=${this.dataType}`,
        data: { data: this.formDataAdd } //将新增数据传进接口中
      });
      this.$message.success("新增成功");

      let { addData } = data;
      this.valueNeed.push({ id: addData.P1 }); //valueNeed添加一条数据
      this.dataList.push(addData); //dataList添加一条数据
      this.dictData = lodash.keyBy(this.dataList, "P1"); //更新数据字典
      this.sortDataList(); //调用：{对dataList函数进行排序（根据arrId）的函数}
      this.showDialogAdd = false; //关闭弹窗
    },
    selectData: function() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listData.$refs.multipleTable.selection;

      selection = util.deepCopy(selection);
      if (!selection.length) return (this.showDialogList = false);

      let arrDataAdd = selection.map((doc, index) => {
        return {
          id: doc.P1
        };
      });

      this.valueNeed = util.deepCopy(this.valueNeed.concat(arrDataAdd));

      this.dataList = this.dataList.concat(selection); //拼接数组

      this.dictData = lodash.keyBy(this.dataList, "P1"); //更新数据字典
      this.sortDataList(); //调用：{对dataList函数进行排序（根据arrId）的函数}
      this.showDialogList = false;
    },

    /**
     * @name 对dataList函数进行排序（根据arrId）的函数
     */

    sortDataList: async function() {
      let dataListNew = []; //变量：{新数组}
      this.valueNeed.forEach(doc => {
        //循环：{新数组}
        dataListNew.push(this.dictData[doc.id]); //{新数组}追加元素
      });

      this.dataList = dataListNew; //更新dataList
    },
    move: function(index, type) {
      this.focusItem = "999";
      util.moveData(index, type, this.valueNeed);
      this.sortDataList(); //调用：{对dataList函数进行排序（根据arrId）的函数}
    },
    copyData: function(index) {
      let copy = util.deepCopy(this.valueNeed[index]);
      this.valueNeed.splice(index, 0, copy); //从下标为1的元素开始删除0个元素.
      this.$message.success("复制成功");
    },
    deleteData: async function(index) {
      this.valueNeed.splice(index, 1); //从下标为1的元素开始删除1个元素.
    },
    /**
     * @name 显示新增数据弹窗函数
     */

    dialogList: function() {
      // alert("dialogAddData");
      this.showDialogList = true;
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
     * @name ajax获取对应列表数据函数
     */
    ajaxGetList: async function() {
      if (!this.valueNeed) return;
      let arrId = this.valueNeed.map(doc => doc.id);
      //Q1:表格形式
      if (this.listType == "table") {
        //任务列表配置添加默认查询条件****
        this.cfDataList.findJsonDefault = { P1: { $in: arrId } };

        //如果{主列表}存在
        if (this.$refs.listDataMain) {
          this.$refs.listDataMain.Objparam.findJson = this.cfDataList.findJsonDefault; //修改筛选参数
          this.$refs.listDataMain.getDataList(); //更新列表
        }

        //Q2:{其他列表}
      } else {
        let { data } = await axios({
          //请求接口
          method: "post",
          url: `${PUB.domain}/crossList?page=${this.dataType}`,
          data: {
            findJson: { P1: { $in: arrId } }
          } //传递参数
        });

        this.dataList = data.list;

        this.dictData = lodash.keyBy(this.dataList, "P1");
        this.sortDataList(); //调用：{对dataList函数进行排序（根据arrId）的函数}
      }
    }
  },
  mounted() {
    if (!this.groupId) {
      //如果没有groupId，启动编辑状态
      this.isEdit = true;
    }
  }
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
