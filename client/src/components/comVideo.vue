<!--
    Name：   视频播放组件
    Author： 
    Create time：2020-02-28
    Update time：
-->
<template>
  <div class="video-player">
    <video-player ref="video" :playsinline="true" :options="playerOptions" v-if="key"></video-player>
  </div>
</template>
<script>
// import videoa from "video.js/dist/video";
// import "video.js/dist/lang/zh-CN";
export default {
  props: {
    video: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      key: false,
      videoDom: null,
      playerOptions: {
        playbackRates: [0.5, 1.0, 1.5, 2.0], //播放速度
        autoplay: false, //如果true,浏览器准备好时开始回放。
        muted: false, // 默认情况下将会消除任何音频。
        loop: false, // 导致视频一结束就重新开始。
        preload: "auto", // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: "zh-cn",
        aspectRatio: "16:9", // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        sources: [
          {
            type: "video/mp4", //这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: ""
          }
        ],
        // poster: "http://www.taoledou.cn/public/home/static/img/logo.png", //你的封面地址
        // width: document.documentElement.clientWidth, //播放器宽度
        notSupportedMessage: "此视频暂无法播放， 请刷新再试", //允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: true,
          fullscreenToggle: true //全屏按钮
        }
      }
    };
  },
  watch: {
    video() {
      this.update();
    }
  },
  created() {
    this.update();
  },
  mounted() {},
  methods: {
    update() {
      this.playerOptions.sources[0].src = this.video.src;
      this.key = true;
    }
  }
};
</script>
<style lang='less'>
.video-player {
  @media screen and (min-width: 768px) {
    border: 1px solid #f5f5f5;
    box-sizing: border-box;
    height: 100%;
    .video-js {
      background: #f5f5f5;
      height: 100%;
    }
  }
  .vjs-control-bar {
    bottom: 7px;
  }
  .vjs-big-play-button {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>