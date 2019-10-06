<template>
  <div class="video-box">
    <div class="video-player-box">
      <div class="video-player-title">视频播放</div>
      <div class="video-player-main">
      <video-player
      class="video-player vjs-custom-skin"
      ref="videoPlayer"
      :playsinline="true"
      :options="playerOptions"
    ></video-player>
    </div>
    </div>
    <div class="video-list-box">
      <div class="video-player-title">播放列表</div>
      <div class='video-list-main'>
        <div v-for="(item,index) in  vedioList" :key="index" class="video-list-msg" @click="changeVideo(item,index)">
          <div class="video-list-img">
            <img src="https://puui.qpic.cn/vpic/0/q00324vx0xh_160_90_3.jpg/0" width="100%" height="100%">
          </div>
          <div class="video-list-title" :class="checkedIndex==index?'active':''">{{item.name}}</div>
          
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { videoPlayer } from "vue-video-player";
import "video.js/dist/video-js.css";

export default {
  components: {
    videoPlayer
  },
  props:{
  },
  computed:{
    player(){
      return this.$refs.videoPlayer.player
    }
  },
  data() {
    return {
      checkedIndex:0,
      vedioList:[],
      playerOptions: {
        playbackRates: [0.7, 1.0, 1.5, 2.0,10], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-CN",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4",
            src: '',//视频url地址
            // src: "http://qn-dmagic.dmagic.cn/201910042218532626_唐球小程序视频1.mp4" //视频url地址
          },
          // {
          //   type: "video/mp4",
          //   src: 'http://qn-dmagic.dmagic.cn/201910042218532626_唐球小程序视频1.mp4',//视频url地址
          //   // src: "http://qn-dmagic.dmagic.cn/201910042218532626_唐球小程序视频1.mp4" //视频url地址
          // },
          // {
          //   type: "video/mp4",
          //   src: 'http://qn-dmagic.dmagic.cn/201910042218532626_唐球小程序视频1.mp4',//视频url地址
          //   // src: "http://qn-dmagic.dmagic.cn/201910042218532626_唐球小程序视频1.mp4" //视频url地址
          // }
        ],
        poster: "../../static/image/thumb_1_1380_460_20181009043014983386.jpg", //你的封面地址
        // width: document.documentElement.clientWidth,
        notSupportedMessage: "此视频暂无法播放，请稍后再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    }
  },
  methods:{

  changeVideo(item,index){
    this.playerOptions.sources[0].src = lodash.get(item,`url[0].url`)
    console.log(this.$refs.videoPlayer.player.play());

    this.checkedIndex = index
  },
   async getVedioData(){
	    let { data } = await axios({
          method: "post",
          url: PUB.domain + '/crossList?page=info_vedio',
          data: {
            findJson: {
              
            }
          }
        }).catch(() => {});
      this.vedioList = data.list
      // console.log('aaaa',lodash.get(this.vedioList[0], `url[0].url`));
      this.playerOptions.sources[0].src = this.vedioList[0].url[0].url
    }
  },
  created(){
    this.getVedioData()
    
  }
};
</script>

<style>
body, html {
    height: 100%;
     /* overflow: hidden; */
}
.video-box{
  display: flex;
  width: 100%;
  height: 100%;
  background-color: rgb(13, 14, 31);
}
.video-player-box{
  flex:0 0 75%;
  margin-left:30px;
}
.video-list-box{
  flex:0 0 25%;
  margin-left:20px;
}
.video-player-title{
  height: 50px;
  line-height: 50px;
  font-size: 25px;
  color:white;
  font-weight: 700;
}
.video-player-main{
  width: 95%;
}
.video-list-main{
  height: 85%;
  width: 75%;
  background-color: rgb(28, 29, 48);
  overflow: auto;
}
.video-list-msg{
  color: white;
  height: 100px;
  display: flex;
  cursor: pointer;
}
.video-list-img{
  padding: 10px;
  flex:0 0 50%
}
.video-list-title{
  flex: 0 0 50%;
  padding: 10px 10px;
}
.active{
  font-weight: 700;
  color:rgb(216, 83, 55)
}
</style>
