<template>
  <div class="match_step">
    <el-steps :active="active" align-center finish-status="success">
      <el-step
        :title="item.title"
        :description="item.description"
        v-for="(item,index) in stepsArr"
        :key="index"
        :status="item.status"
      ></el-step>
    </el-steps>
  </div>
</template>
<script>
export default {
  components: {},
  props: ["value"],
  // matchProgress: { smallProgress: 3, bigProgress: 1 }   需要传入的数据格式
  data() {
    return {
      active: null, //聚焦的默认状态为0
      stepsArr: [
        { title: "选拔赛(城市赛)", description: "", value: 11 },
        { title: "晋级赛(城市赛)", description: "", value: 12 },
        { title: "决赛(城市赛)", description: "", value: 13 },
        { title: "淘汰赛/循环赛(城际赛)", description: "", value: 21 },
        { title: "1/4决赛(城际赛)", description: "", value: 22 },
        { title: "决赛(城际赛)", description: "", value: 23 }
      ]
    };
  },
  mounted() {
    if (this.value) {
      this.stepsArr.forEach((item, index) => {
        if (this.value.smallProgress == item.value) {
          this.active = index; //当前选中状态
        }
        // if (this.active == index) {
        //   item.status = "success"; //当前选中状态的样式
        // }
      });
    }
  }
};
</script>


<style scoped>
.match_step {
  margin: 10px;
}
</style>
