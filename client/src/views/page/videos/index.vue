<!--
    Author： 
    Create time：2020-02-24
    Update time：
-->
<template>
  <div>
    <el-row>
      <el-col :span="24" class="scale-box">
        <!-- 轮播图 -->
        <div class="scale-item">
          <el-carousel :interval="5000" arrow="never" height="100%">
            <el-carousel-item v-for="item in carousel" :key="item.pic">
              <el-image :src="item.pic" fit="contain"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="24" class="title hidden-xs-only">
        <h3>视频教程</h3>
        <p>淘乐逗几大课程教您轻松解决问题</p>
      </el-col>
    </el-row>
    <div class="container">
      <template v-for="(item,index) in videoList">
        <el-row class="video-box" :key="index">
          <el-col
            :xs="{span:22,offset:1}"
            :sm="{span:5}"
            class="video-image"
            @click.native="toDetails(item.id)"
          >
            <el-image :src="item.pic" fit="cantion"></el-image>
            <div class="hidden-sm-and-up video-image-title">
              <div>
                <span>入门必修课</span>
              </div>
              <el-button size="mini" type="primary">立即观看</el-button>
            </div>
          </el-col>
          <el-col :sm="{span:18,push:1}" class="hidden-xs-only">
            <div class="video-title">
              课程目录
              <span @click.stop="toPlay(item.id)" style="cursor:pointer">免费试看</span>
            </div>
            <ul class="video-list">
              <template v-for="(k,i) in item.child">
                <li :key="i" @click.stop="toDetails(item.id)">{{i+1}}. {{k.title}}</li>
              </template>
            </ul>
          </el-col>
        </el-row>
      </template>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      videoList: [],
      carousel: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      let { data } = await this.fnAxios("/homes/videos/index");
      if (data.code) {
        this.carousel = data.banner;
        this.videoList = data.type;
      }
    },
    toDetails(videoId) {
      this.$router.push("details/" + videoId);
    },
    toPlay(listId) {
      this.$router.push("play/" + listId);
    }
  }
};
</script>
<style lang='less' scoped>
.title {
  text-align: center;
  margin-top: 70px;

  h3 {
    font-size: 36px;
    margin: 0;
  }
  p {
    font-size: 20px;
  }
}
.video-box {
  margin: 40px 0;
  .video-image {
    position: relative;
    .video-image-title {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 40px;
      color: #fff;
      background: rgba(0, 0, 0, 0.6);
      padding: 10px;
      display: flex;
      align-items: center;
      > div {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        overflow: hidden;
        height: 100%;
        flex: 1 1 auto;
        > span {
          display: inline-block;
          text-align: left;
        }
      }
    }
  }
  .video-title {
    font-size: 25px;
    span {
      color: #f52;
      font-size: 14px;
      margin-left: 10px;
    }
  }
  .video-list {
    margin: 10px 0;
    li {
      margin: 5px 0;
      background: #f2f2f2;
      line-height: 25px;
      text-indent: 10px;
      cursor: pointer;
    }
  }
}
</style>