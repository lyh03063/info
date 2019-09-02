<template>
  <div class>
    <!--添加城市场馆弹窗-->
    <el-dialog
      custom-class="n-el-dialog"
      width="55%"
      title="添加城市/场馆"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :append-to-body="true"
      v-bind:visible.sync="isShowDialogAddCityVanue"
      v-if="isShowDialogAddCityVanue" 
    >
      <!-- 绑定数据 {{objCityVanue}} -->
      <select_city_venue v-model="objCityVanue"></select_city_venue>
      <dm_space height="20"></dm_space>
      <div class="TAC">
        <el-button type="primary" @click="addCityVanue">添加</el-button>
      </div>
    </el-dialog>
    <div>
      城市赛阶段的城市场馆列表（已选{{valueNeed.length}}个）
      <i
        class="el-icon-plus"
        @click="isShowDialogAddCityVanue=true"
        v-if="isEdit"
      ></i>
    </div>
    <div class="valueNeed">
      <span v-for="(item,index) in valueNeed" :key="index">
        {{item.cityName}}--{{item.venueName}}
        <i
          class="el-icon-remove-outline"
          @click="nationalMatchDelete(index)"
          v-if="isEdit"
        ></i>
      </span>
    </div>
  </div>
</template>
<script>
import select_city_venue from "./select_city_venue.vue";
export default {
  components: { select_city_venue },
  props: {
    value: [Array],
    isEdit: {
      default: true
    }
  },
  watch: {
    valueNeed: {
      handler(newVal, oldVal) {
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  data() {
    return {
      valueNeed: this.value || [],
      isShowDialogAddCityVanue: false, //是否显示添加城市场馆的弹窗
      objCityVanue: {
        cityId: "4401",
        cityName: "广州",
        venueId: 15,
        venueName: "场馆名称"
      },
      newsmallmatchProcess: []
    };
  },
  methods: {
    nationalMatchDelete(key) {
      this.valueNeed.splice(key, 1);
    },
    addCityVanue() {
      //函数：{添加一个城市场馆函数}
      this.isShowDialogAddCityVanue = false;
      this.valueNeed.unshift(util.deepCopy(this.objCityVanue));
    }
  }
};
</script>


<style scoped>
.valueNeed span {
  display: block;
  background-color: #fafafa;
  padding: 3px 0;
  margin: 10px 15px;
  margin-right: 100px;
  position: relative;
}

.valueNeed {
  text-align: center;
  border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;
  width: 80%;
}
i.el-icon-remove-outline {
  position: absolute;
  top: 10px;
  right: -50px;
  font-size: 20px;
  color: #dcdfe6;
  font-weight: bold;

  cursor: pointer;
}
i.el-icon-plus {
  padding: 4px;
  color: #fff;
  background-color: #dcdfe6;
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
}
</style>