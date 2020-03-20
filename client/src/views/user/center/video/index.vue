<!--
    Name：   学习记录
    Author： 
    Create time：2020-03-01
    Update time：
-->
<template>
  <div>
    <template v-for="(item,index) in videoList">
      <div class="box" :key="index">
        <el-image :src="item.pic" fit="contain">
          <img
            src="http://www.taoledou.cn/uploads/pictrue/20191203/82816ffad2ae905b0b8393c81b529fbe.jpg"
            slot="error"
            height="130px"
          />
        </el-image>
        <div class="info">
          <div class="title" @click="onPlay(item)">
            <span>{{item.title}}</span>
          </div>
          <div class="doc">{{item.title || '暂无简介'}}</div>
          <div class="plan">
            <span>学习至：{{item.seconds}}</span>
            <el-button type="primary" @click="onPlay(item.types,item.video_id)">继续学习</el-button>
          </div>
        </div>
      </div>
    </template>
    <div style="text-align:center;margin:20px 0">
      <el-pagination
        class="hidden-xs-only"
        :current-page="page.currentIndex"
        layout="prev, pager, next"
        :page-size="page.size"
        :total="page.total"
        hide-on-single-page
        @current-change="onPage"
      ></el-pagination>
      <el-link class="hidden-sm-and-up" :underline="false" @click="tapPage">点击加载下一页</el-link>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: {
        total: 0,
        size: 12,
        currentIndex: 1
      },
      videoList: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    onPlay(courseId, videoId) {
      this.$router.push("/videos/play/" + courseId + "/" + videoId);
    },
    async getData(page = 1, type = false) {
      let userInfo = this.fnStorage.getStore("user");
      let options = {
        params: {
          limit: this.page.size,
          uid: userInfo.id,
          page
        }
      };
      let { data } = await this.fnAxios("/homes/Personal/video?", options);
      if (data.code) {
        this.page.total = data.count;
        if (!type) this.videoList = data.data;
        else this.videoList = this.videoList.concat(data.data);
      }
    },
    tapPage() {
      // 小屏加载
      this.page.currentIndex += 1;
      this.getData(this.page.currentIndex, true);
    },
    onPage(i = 1) {
      // 大屏加载
      this.page.currentIndex = i;
      this.getData(i);
    }
  }
};
</script>
<style lang='less' scoped>
.line-hidden(@num) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
  overflow: hidden;
}
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-top: 20px;
  .el-image {
    max-width: 130px;
    min-width: 130px;
    box-shadow: 0 0 10px #ccc;
    margin: 10px;
    /deep/ img {
      width: 100%;
    }
  }

  .info {
    flex: 1 1 auto;
    height: 150px;
    .title {
      font-size: 20px;
      font-weight: bold;
      cursor: pointer;
      .line-hidden(1);
    }
    .doc {
      height: 60px;
      .line-hidden(3);
      color: #777;
    }
    .plan {
      max-width: 1800px;
      height: 50px;
      color: #444;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 10px;
    }
  }
}
</style>