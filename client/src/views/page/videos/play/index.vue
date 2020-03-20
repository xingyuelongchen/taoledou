<!--
    Name：   视频播放页
    Author： 
    Create time：2020-02-28
    Update time：
-->
<template>
  <div>
    <div class="container">
      <el-row class="hidden-xs-only">
        <el-col>
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <template v-for="(item,index) in navList">
              <el-breadcrumb-item :to="item" :key="index">{{item.title}}</el-breadcrumb-item>
            </template>
          </el-breadcrumb>
        </el-col>
      </el-row>
      <el-row class="hidden-xs-only">
        <el-col :xs="24" :sm="24" class="video-title">{{$route.meta.title}}</el-col>
      </el-row>
      <!-- <el-row class="video-box"> -->
      <div class="video-box">
        <!-- <el-col :xs="24" :sm="24" :md="{span:16 }"> -->

        <videoPlayer :video="video" :key="resetVideo" />

        <!-- </el-col> -->
        <!-- <el-col :xs="24" :sm="24" :md="8"> -->

        <div class="video-list">
          <div class="video-box-title">视频目录</div>
          <div class="video-item">
            <div>
              <tree :videoList="videoList" :event="onDetails" />
            </div>
          </div>
        </div>
        <!-- </el-col> -->
      </div>
      <!-- </el-row> -->
    </div>
  </div>
</template>
<script>
export default {
  components: {
    videoPlayer: () => import("@/components/comVideo"),
    tree: () => import("./tree")
  },
  computed: {
    navList() {
      return this.$route.matched.map(k => {
        return { title: k.meta.title, path: k.path };
      });
    }
  },
  data() {
    return {
      resetVideo: 1,
      activeName: 0,
      courseId: null, // 课程id
      videoId: null, // 视频id
      video: {},
      videoList: []
    };
  },
  async created() {
    this.courseId = this.$route.params.courseId;
    this.videoId = this.$route.params.videoId || "";
    this.getData(this.courseId);
    if (this.videoId) {
      this.getVideoData(this.videoId, this.courseId);
    } else {
      this.getVideoData();
    }
  },
  methods: {
    async getData(id) {
      let { data } = await this.fnAxios("/homes/videos/videolist?typeid=" + id);
      if (data.code) {
        this.videoList = data.type;
        this.videoInfo = Object.assign({}, data.data, { count: data.count });
      }
    },

    async getVideoData(id, courseId, type = true) {
      let data = null;
      if (type) {
        let d = await this.fnAxios("/homes/videos/see?types=" + this.courseId);
        data = d.data;
      } else {
        let d = await this.fnAxios(
          "/homes/videos/detail?id=" + id + "&courseId=" + courseId
        );
        data = d.data;
      }
      if (data.code) {
        this.video = { src: data.data.url1 };
        this.$route.meta.title = data.data.title;
        this.$route.meta.keywords = data.key.keyword;
        this.$route.meta.description = data.key.content;
        this.resetVideo = Math.random() * 10;
      }
    },
    onDetails(item) {
      if (item.child) return;
      this.videoId = item.id;
      let path = "/videos/play/" + this.courseId + "/" + this.videoId;
      let isLogin = this.fnStorage.getStore("user") || false;

      if ((isLogin && isLogin.id) || item.see_status) {
        this.getVideoData(item.id, this.courseId, !!item.see_status);
        this.$route.meta.title = item.title;
        return;
      }
      this.$router.push("/user/login?rediect=" + path.replace(/\//g, "_"));
    }
  }
};
</script>
<style lang='less' scoped>
.el-breadcrumb {
  margin: 40px 0;
}
.video-title {
  font-size: 26px;
  margin-bottom: 40px;
}
.video-box {
  margin-bottom: 80px;
  overflow: hidden;

  @media screen and (min-width: 768px) {
    max-height: 510px;
    display: grid;
    /* width: 100%; */
    grid-template-columns: 70% 30%;
    align-items: center;
    background: #fefefe;
    min-height: 500px;
    height: 510px;
    box-shadow: 0 0 5px #ccc;
  }
  .el-col,
  .video-player {
    height: 100%;
  }
}
.video-list {
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
  border: 1px solid #f5f5f5;
  .video-box-title {
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    padding: 0 20px;
    background: #f5f5f5;
  }
  .video-item {
    padding: 0px 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    height: calc(100% - 50px);
    max-height: 460px;
    .video-item-title {
      font-size: 16px;
    }
    .video-item-box {
      .video-item-box-item {
        padding-left: 20px;
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &:hover {
          color: #f52;
        }
        span {
          cursor: pointer;
          flex: 1;
          text-align: right;
          &:first-child {
            flex: 5;
            text-align: left;
          }
          i {
            font-size: 16px;
          }
        }
      }
    }
  }
}
</style>