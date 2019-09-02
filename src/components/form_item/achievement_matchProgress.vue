<template>
  <div>{{nweMatchProgress}}</div>
</template>

<script>
export default {
  props: { matchProgress: Object },
  data() {
    return {
      nweMatchProgress: this.matchProgress
    };
  },
  watch: {
    matchProgress: function() {
      // alert(1)
      this.matchProgressNeed()
    }
  },
  methods: {
    matchProgressNeed() {
      this.nweMatchProgress= this.matchProgress;
      if (this.nweMatchProgress.bigProgress == 1) {
        if (this.nweMatchProgress.smallProgress == 11) {
          this.nweMatchProgress = "城市赛：选拔赛";
        } else if (this.nweMatchProgress.smallProgress == 12) {
          this.nweMatchProgress = "城市赛：晋级赛";
        } else {
          this.nweMatchProgress = "城市赛：决赛";
        }
      } else {
        if (this.nweMatchProgress.smallProgress == 21) {
          this.nweMatchProgress = "城际赛：淘汰赛/循环赛";
        } else if (this.nweMatchProgress.smallProgress == 22) {
          this.nweMatchProgress = "城际赛：1/4决赛";
        } else {
          this.nweMatchProgress = "城际赛：决赛";
        }
      }
    }
  },
  mounted() {
    this.matchProgressNeed()
  }
};
</script>

<style scoped>
</style>
