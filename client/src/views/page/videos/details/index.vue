<!--
    Author： 
    Create time：2020-02-25
    Update time：
-->
<template>
  <div>
    <div class="container">
      <el-row class="video-details">
        <el-col :xs="24" :sm="{span:5,offset:2}">
          <el-image :src="videoInfo.pic" fit="contain"></el-image>
          <div class="hidden-sm-and-up" style="text-align:center;margin-top:30px">
            <el-button type="primary" @click="toVideoPlay">立即观看</el-button>
          </div>
        </el-col>
        <el-col :sm="{span:16,push:1}" class="hidden-xs-only">
          <span class="title">{{videoInfo.title}}</span>
          <p>适合人群：电商掌柜</p>
          <p>课程共计：{{videoInfo.count}}节</p>
          <p>
            <el-button type="primary" @click="toVideoPlay">立即观看</el-button>
          </p>
        </el-col>
      </el-row>
      <el-row class="video-list">
        <el-col class="video-box">
          <div class="video-box-title">视频目录</div>
          <div class="video-item">
            <tree :videoList="videoList" :event="onDetails" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  components: { tree: () => import("./tree") },
  data() {
    return {
      activeName: 0,
      videoList: [],
      videoId: null,
      props: { children: "child", label: "title" },
      videoInfo: { title: "", count: 0, pic: "" }
    };
  },
  created() {
    this.videoId = this.$route.params.id;
    this.getData(this.videoId);
  },
  methods: {
    async getData(id) {
      let { data } = await this.fnAxios("/homes/videos/videolist?typeid=" + id);
      if (data.code) {
        this.videoList = data.type;
        this.videoInfo = Object.assign({}, data.data, { count: data.count });
        this.$route.meta.title = data.key.y_title;
        this.$route.meta.keywords = data.key.keyword;
        this.$route.meta.description = data.key.content;
      }
    },
    onDetails(item) {
      if (item.child) return;
      let path = "/videos/play/" + this.videoId;

      let isLogin = this.fnStorage.getStore("user") || false;
      if ((isLogin && isLogin.id) || item.see_status) {
        this.$router.push(path);
        return;
      }
      this.$router.push("/user/login");
    },
    toVideoPlay() {
      this.forTree(this.videoList);
      // this.onDetails();
    },
    forTree(a) {
      if (a[0] && a[0].child && a[0].child.length) {
        this.forTree(a[0].child);
      } else {
        this.onDetails(a[0]);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.video-details {
  background: #f2f2f2f2;
  padding: 10px 0 30px;

  .el-image {
    width: 100%;
    margin: 0 auto;
    max-height: 300px;
    border-radius: 3px;
    img {
      height: 100%;
    }
    @media screen and (max-width: 768px) {
      border-radius: 0;
      margin-top: -10px;
    }
  }
  .hidden-xs-only {
    width: 50%;
    margin-left: 30px;
    .title {
      font-size: 28px;
    }
  }
}
.video-list {
  margin-bottom: 40px;

  overflow: hidden;
  .video-box {
    border: 1px solid #ddd;
    .video-box-title {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      padding: 0 20px;
      border-bottom: 1px solid #ddd;
    }
    .video-item {
      padding: 20px;
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
}
</style>