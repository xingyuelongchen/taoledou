<template>
  <el-row class="casess">
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
    <el-col :xs="{span:22,offset:1}">
      <!-- 大屏 -->
      <div class="container">
        <el-row class="casess-list hidden-xs-only" :gutter="20">
          <template v-for="(item,index) in casessList">
            <el-col class="casess-item" :key="index" :sm="12" :md="8" :lg="6" :xl="6">
              <div class="casess-box" :key="index" @click="toDetails(item.id)">
                <el-image :src="item.pic" fit="cover" />
                <div class="casess-item-description">
                  <span class="title">{{item.title}}</span>
                  <span class="description">{{item.content | filtersHtml}}</span>
                  <span class="data">
                    <span>
                      <i class="el-icon-view"></i>
                      阅读
                      {{item.count}}
                    </span>
                    <span>{{item.create_time}}</span>
                  </span>
                </div>
              </div>
            </el-col>
          </template>
        </el-row>
      </div>
      <!-- 小屏 -->
      <el-row class="hidden-sm-and-up">
        <template v-for="(item,index) in casessList">
          <el-col :key="index" class="casess-mobile-box" @click.native.stop="toDetails(item.id)">
            <div class="image">
              <img :src="item.pic" :alt="item.title" />
            </div>
            <div class="casess-mobile-content">
              <div class="title">{{item.title}}</div>
              <div class="description">{{item.content | filtersHtml}}</div>
              <div class="data">
                <span>
                  <i class="el-icon-view"></i>
                  {{item.count}}
                </span>
                <span>
                  <i class="el-icon-time"></i>
                  {{item.create_time}}
                </span>
              </div>
            </div>
          </el-col>
        </template>
      </el-row>
    </el-col>
    <el-col style="text-align:center">
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
    </el-col>
  </el-row>
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
      pageIndex: 1,
      carousel: [
        { pic: "http://www.taoledou.cn/public/home/static/img/ccc.png" }
      ],
      casessList: []
    };
  },
  async created() {
    await this.getData(1);
  },
  methods: {
    async getData(page, type = false) {
      let { data } = await this.fnAxios(
        "/homes/casess/index?limit=" + this.page.size + "&page=" + page
      );
      if (data.code) {
        this.page.total = data.count;
        if (!type) this.casessList = data.data;
        else this.casessList = this.casessList.concat(data.data);
        this.$route.meta.title = data.key.y_title;
        this.$route.meta.keywords = data.key.keyword;
        this.$route.meta.description = data.key.content;
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
    },
    toDetails(id = 0) {
      this.$router.push("details/" + id);
    }
  }
};
</script>

<style lang="less" scoped>
.line-hidden(@num) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
  overflow: hidden;
}
.casess {
  min-height: 110vh;
  .el-image {
    width: 100%;
  }
  .casess-list {
    margin-top: 40px;
    .casess-item {
      .casess-box {
        cursor: pointer;
        position: relative;
        margin-bottom: 40px;
        border: 1px solid #ccc;
        color: #555;
        border-radius: 5px;
        overflow: hidden;
        transition: all 0.6s ease-in;
        /deep/ img {
          transition: all 0.2s ease-out;
        }
        &:hover {
          // border-color: #eee;
          box-shadow: 0 0 10px #ccc;
          transition: all 0.2s ease-out;
          /deep/ img {
            transition: all 0.6s ease-out;
            transform: scale(1.1);
          }
        }
        .el-image {
          width: 100%;
          max-height: 260px;
          height: 260px;
        }
        .casess-item-description {
          text-align: center;
          overflow: hidden;
          padding: 10px 5px;
          font-size: 16px;
          > .title {
            display: inline-block;
            text-align: left;
            font-size: 26px;
            width: 100%;
            margin: 10px 0;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          > .description {
            .line-hidden(3);
            text-align: left;
            min-height: 63px;
          }
          > .data {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            padding: 0 5px;
          }
        }
      }
    }
  }
  .casess-mobile-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 200px;
    border-bottom: 1px solid #eee;
    .image {
      height: 150px;
      min-width: 150px;
      width: 150px;
      max-width: 150px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .casess-mobile-content {
      height: 150px;
      margin-left: 10px;
      color: #555;
      > .title {
        font-size: 18px;
        margin-bottom: 10px;
        .line-hidden(2);
      }
      > .description {
        .line-hidden(3);
        margin-bottom: 10px;
        min-height: 60px;
      }
      > .data {
        font-size: 12px;
        color: #ccc;
        span {
          margin: 0 10px;
        }
      }
    }
  }
  .el-pagination {
    text-align: center;
    margin: 50px 0;
  }
  .el-link {
    padding: 20px 0;
  }
}
</style>