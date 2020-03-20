<!--
    Name：  行业动态详情
    Author： 
    Create time：2020-02-26
    Update time：
-->
<template>
  <div>
    <el-row class="container">
      <el-col :xs="{span:22,offset:1}">
        <h1 v-text="article.title" class="title"></h1>
        <p class="info">
          <span>
            <i class="el-icon-view"></i>
            阅读:
            {{article.volume}}
          </span>
          <span>
            <i class="el-icon-user"></i>
            作者:
            {{article.uid}}
          </span>
          <span>
            <i class="el-icon-time"></i>
            时间:
            {{article.create_time}}
          </span>
        </p>
        <div v-html="article.content" class="content">
          <!-- 内容 -->
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      article: {}
    };
  },
  created() {
    let id = this.$route.params.id;
    if (id) this.getData(id);
    // console.log("加载对应的文章", id);
  },
  methods: {
    async getData(id) {
      let { data } = await this.fnAxios("/homes/Online/detail?id=" + id);
      if (data.code) {
        this.article = data.data;
        this.$route.meta.title = data.data.title;
        this.$route.meta.keywords = data.key.keyword;
        this.$route.meta.description = data.key.content;
      }
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
.title {
  width: 80%;
  margin: 40px auto;
  text-align: center;
  line-height: 40px;
  font-size: 28px;
  @media screen and (max-width: 768px) {
    width: 100%;
    font-size: 16px;
    line-height: 1.8;
    .line-hidden(2);
  }
}
.info {
  text-align: center;
  margin: 0 0 60px;
  @media screen and (max-width: 768px) {
    margin: 0px 0 40px;
  }
  span {
    margin-left: 8px;
  }
}
.content {
  /deep/ img {
    max-width: 100%;
    object-fit: contain;
  }
  line-height: 2.5;
}
</style>