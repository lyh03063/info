<template>
  <div class>
    关联数据列表：
    <el-button plain @click="dialogAddData" size="mini">新增并引用</el-button>
    <el-button plain @click="dialogList" size="mini">从已有数据引用</el-button>
    <dm_debug_list>
      <dm_debug_item v-model="dictData" text="dictData" />
      <dm_debug_item v-model="dataList" text="dataList" />
      <dm_debug_item v-model="valueNeed" text="valueNeed" />
    </dm_debug_list>
    <!-- v-if="valueNeed && valueNeed.length"这个条件在空数组添加数据时报错 -->
    <div class >
      <dm_space height="8"></dm_space>
      <ul>
        <li
          v-for="(doc,i) in valueNeed"
          :key="i"
          :class="{'data-group':true}"
          @mouseenter="focusItem=i"
          @mouseleave="focusItem=999"
        >
          <div class v-if="dictData[doc.id]">
            <span>{{doc.id}}:{{dictData[doc.id].name}}</span>
            <div class="tool-bar">
              <i class="el-icon-top btn-op" title="上移" @click="move(i, 'up')" v-if="i>0"></i>
              <i
                class="el-icon-bottom btn-op"
                title="下移"
                @click="move(i, 'down')"
                v-if="i<valueNeed.length-1"
              ></i>
              <i class="el-icon-edit btn-op" title="编辑"></i>
              <i class="el-icon-copy-document btn-op" title="复制"></i>
              <i class="el-icon-delete btn-op" title="删除" @click="deleteData(i)"></i>
            </div>
          </div>
        </li>
      </ul>
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
      <dm_dynamic_form :cf="cfFormAdd" v-model="formDataAdd"></dm_dynamic_form>
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
      <dm_list_data :cf="cfList" ref="listData"></dm_list_data>
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
  data() {
    return {
      //选择数据列表配置
      cfList: PUB.listCF.piece,
      cfFormAdd: {
        formItems: PUB.listCF.piece.formItems,
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
    selectData: function() {
      //获取选中的数据，此处可优化，使用selection-change事件
      let selection = this.$refs.listData.$refs.multipleTable.selection;

      selection = util.deepCopy(selection);
      console.log("selection", selection);
      if (!selection.length) return (this.showDialogList = false);

      let arrDataAdd = selection.map((doc, index) => {
        return {
          id: doc.P1
        };
      });

      this.valueNeed = util.deepCopy(this.valueNeed.concat(arrDataAdd));

      this.dataList = this.dataList.concat(selection); //拼接数组
      this.dictData = lodash.keyBy(this.dataList, "P1"); //更新数据字典
      this.showDialogList = false;
    },
    move: function(index, type) {
      this.focusItem = "999";
      util.moveData(index, type, this.valueNeed);
    },
    copyData: function(index) {
      let copy = util.deepCopy(this.valueNeed[index]);
      this.valueNeed.splice(index, 0, copy); //从下标为1的元素开始删除0个元素.
      this.$message.success("复制成功");
    },
    deleteData: async function(index) {
      this.valueNeed.splice(index, 1); //从下标为1的元素开始删除1个元素.
      // let clickStatus = await this.$confirm("确定删除该数据？").catch(() => {});
      // if (clickStatus == "confirm") {
      //   //如果点击了确定

      // }
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
    },
    /**
     * @name ajax获取对应列表数据函数
     */
    ajaxGetList: async function() {
      let arrId = this.valueNeed.map((doc, index) => {
        return doc.id;
      });

      let { data } = await axios({
        //请求接口
        method: "post",
        url: PUB.domain + "/crossList?page=info_piece",
        data: {
          findJson: { P1: { $in: arrId } }
        } //传递参数
      });

      this.dataList = data.list;
      this.dictData = lodash.keyBy(this.dataList, "P1");
    }
  },
  mounted() {
    this.ajaxGetList();
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
</style>
