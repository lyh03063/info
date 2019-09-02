<template>
  <div class>
    <el-select
      class="MR20"
      v-model="valueNeed.bigProgress"
      placeholder="请选择"
      @change="selectBigProcess"
      v-if="matchTypeNeed==2"
    >
      <el-option v-for="item in options" :key="item.code" :label="item.name" :value="item.code"></el-option>
    </el-select>
    <el-select v-model="valueNeed.smallProgress" placeholder="请选择">
      <el-option
        v-for="item in optionsSmall"
        :key="item.code"
        :label="item.name"
        :value="item.code"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  //用于列表模糊查询的组件
  props: {
    value: [Object],
    matchType: [String, Number], //赛事类型
    matchId: [String, Number] //赛事类型，主要是用来确定赛事类型的
  },
  data() {
    return {
      url: {
        detail: "/crossDetail?page=tangball_match"
      },
      //****这个初始值保障选项能实时响应
      valueNeed: this.value || { bigProgress: null, smallProgress: null },
      matchTypeNeed: this.matchType,
      bigProgress: "",
      smallProgress: "",
      optionsSmall: [],
      options: [
        {
          code: 1,
          name: "城市赛",
          childrens: [
            {
              code: 11,
              name: "选拔赛"
            },
            {
              code: 12,
              name: "晋级赛"
            },
            {
              code: 13,
              name: "决赛"
            }
          ]
        },
        {
          code: 2,
          name: "城际赛",
          childrens: [
            {
              code: 21,
              name: "淘汰赛/循环赛"
            },
            {
              code: 22,
              name: "1/4决赛"
            },
            {
              code: 23,
              name: "决赛"
            }
          ]
        }
      ]
    };
  },

  watch: {
    //监听器
    matchId: {
      //赛事id
      async handler(newVal, oldVal) {
        if (!this.matchId) return;

        let { data } = await axios({
          //请求接口
          method: "post",
          url: PUB.domain+this.url.detail,
          data: {
            id: this.matchId
          } //传递参数
        });
        if (!data.Doc) return;
        this.matchTypeNeed = data.Doc.matchType;
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchTypeNeed: {
      //组件内部使用的赛事类型
      handler(newVal, oldVal) {
        this.init(); //调用：{初始化函数}
      },
      immediate: true, //组件初始化时立即执行一次变动
      deep: true //深度监听
    },
    matchType() {
      //外部传入的赛事类型
      this.matchTypeNeed = this.matchType;
    },
    valueNeed: {
      //绑定值
      handler(newVal, oldVal) {
        
        this.$emit("input", this.valueNeed); //同步valueNeed值到value
      },
      // immediate: true,//组件初始化时立即执行一次变动
      deep: true //深度监听
    }
  },
  methods: {
    selectBigProcess(value) {
      //函数：{选择大赛段后函数}
      this.optionsSmall = this.options[value - 1].childrens;
      this.valueNeed.smallProgress = this.optionsSmall[0].code;
    },

    //函数：{初始化函数}
    init() {
      //如果是普通比赛
      if (this.matchTypeNeed == 1) {
        this.optionsSmall = [
          {
            code: 21,
            name: "淘汰赛/循环赛"
          },
          {
            code: 22,
            name: "1/4决赛"
          },
          {
            code: 23,
            name: "决赛"
          }
        ];
      } else if (this.valueNeed.bigProgress) {
        let docNeed = this.options.find(
          docEach => docEach.code == this.valueNeed.bigProgress
        );
        if (!docNeed) return;
        this.optionsSmall = docNeed.childrens;
      }
    },
    created() {}
  }
};
</script>

<style scoped>
</style>
