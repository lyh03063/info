<template>
  <div class>
    <input
      type="text"
      v-model="valueNeed"
      name="name"
      style="border:3px solid red;width:200px;height:100px"
      @input="change"
      class="FL MR10"
    >
    <div class="FL MR10" >
      <el-button plain @click="fill(1)" size="mini">模板1</el-button>
    <el-button plain @click="fill(2)" size="mini">模板2</el-button>
    </div>
    
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },
  data() {
    return {
      valueNeed: this.value,
      textTemp: {
        "1": "这是一个很牛逼的商品介绍",
        "2": "这是一个很牛逼的商品介绍2"
      }
    };
  },
  methods: {
    change() {
      this.$emit("input", this.valueNeed);//触发双向绑定
    },
    fill(index) {
      this.valueNeed =  this.textTemp[index];
      this.$emit("input", this.valueNeed);//触发双向绑定
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
