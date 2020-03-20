<!--
    Author： 
    Create time：2020-02-24
    Update time：
-->
<template>
  <div style="home">
    <!-- 轮播图 -->
    <div class="scale-box">
      <div class="scale-item">
        <el-carousel :interval="5000" arrow="always" height="100%">
          <el-carousel-item v-for="item in carousel" :key="item.pic">
            <el-image :src="item.pic" fit="contain" style="width:100%"></el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <div class="container">
      <el-row>
        <el-col class="title">实力企业 品牌保证</el-col>
        <el-col :xs="{span:22,offset:1}" class="band-image">
          <el-image src="http://www.taoledou.cn/public/home/static/img/qy1.png" />
          <el-image src="http://www.taoledou.cn/public/home/static/img/qy2.png" />
          <el-image src="http://www.taoledou.cn/public/home/static/img/qy3.png" />
          <el-image src="http://www.taoledou.cn/public/home/static/img/qy4.png" />
        </el-col>
      </el-row>
      <el-row>
        <el-col>
          <el-image src="http://www.taoledou.cn/public/home/static/img/sps.png" fit="contain" />
        </el-col>
        <el-col>
          <videoPlayer
            class="video"
            :video="{src:'https://www.taoledou.cn/public/home/static/qiye.mp4'}"
          />
        </el-col>
      </el-row>
      <el-row class="band-goodes">
        <el-col class="title">提供厂家货源 无需囤货</el-col>
        <el-col :xs="{span:22,offset:1}">
          <div class="box">
            <template v-for="(item,index) in bandGoodes">
              <div class="item" :key="index">
                <el-image :src="item.pic" />
                <div class="doc">{{item.title}}</div>
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row class="band-served">
        <el-col style="margin-bottom:40px">
          <div class="title">一站式网店服务 专注更专业</div>
          <p class="subtitle">专注于一站式的电子商务专业服务，让互联网创业更加简单</p>
        </el-col>
        <el-col :xs="{span:22,offset:1}">
          <div class="box">
            <template v-for="(item,index) in bandServed">
              <div class="item" :key="index">
                <div class="item-title" :style="{background:item.color}">{{item.title}}</div>
                <el-image :src="item.pic" />
                <div class="item-doc">{{item.doc}}</div>
                <!-- <div class="item-button">
                  <div class="button" :style="{background:item.color}">立即加入</div>
                </div>-->
              </div>
            </template>
          </div>
        </el-col>
      </el-row>
      <el-row class="band-tutor">
        <el-col>
          <div class="title">客户至上 金牌荣誉 名师指导</div>
          <p class="subtitle">十年淘宝经验整合实践经验，导师全天7*15小时在线解决运营难题，随叫随到，贴心服务</p>
        </el-col>
        <el-col :xs="{span:22,offset:1}">
          <swiper :options="swiperOption.a" ref="mySwiper">
            <template v-for="(item,index) in swiper.a">
              <swiper-slide :key="index">
                <el-image :src="item.pic" />
              </swiper-slide>
            </template>
          </swiper>
        </el-col>
        <el-col :xs="{span:22,offset:1}">
          <swiper :options="swiperOption.b" ref="mySwiper">
            <template v-for="(item,index) in swiper.b">
              <swiper-slide :key="index">
                <el-image :src="item.pic" />
              </swiper-slide>
            </template>
          </swiper>
        </el-col>
      </el-row>
    </div>
    <div class="band-zixun">
      <div class="container">
        <div class="zhixun">
          <div class="title">立刻咨询 创业开店</div>
          <el-row>
            <el-col :xs="{span:22,offset:1}" :sm="{span:12}" style="text-align:center">
              <el-image :src="banner" style="width:auto" />
            </el-col>
            <el-col :xs="{span:22,offset:1}" :sm="{span:12}">
              <div class="item">
                <span>联系人：</span>
                <input v-model="form.name" type="text" placeholder="请输入联系人姓名" />
              </div>
              <div class="item">
                <span>联系电话：</span>
                <input v-model="form.mobile" type="text" placeholder="请输入联系人电话" />
              </div>
              <div class="item">
                <span>微信号：</span>
                <input v-model="form.weixin" type="text" placeholder="请输入联系人微信" />
              </div>
              <div class="item">
                <span>QQ号：</span>
                <input v-model="form.qq" type="text" placeholder="请输入联系人QQ号" />
              </div>
              <div class="item">
                <span></span>
                <button @click="onSave">立即提交</button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div class="container">
      <el-row class="band-news" v-if="news.length">
        <el-col class="title">新闻中心</el-col>
        <el-col
          :xs="{span:22,offset:1}"
          :sm="12"
          class="news-first"
          @click.native="onDetails(news[0].id)"
        >
          <el-image :src="news[0].pic" />
          <div class="news-first-title">
            <span class="news-first-title-a">{{news[0].title}}</span>
            <span>{{news[0].create_time}}</span>
          </div>
        </el-col>
        <el-col :xs="22" :sm="11" :offset="1">
          <template v-for="(item,index) in news">
            <div :key="index" class="news-box" v-if="index !==0" @click="onDetails(item.id)">
              <el-image :src="item.pic" />
              <div class="news-item">
                <div class="news-title">
                  <span class="news-first-title-a">{{news[0].title}}</span>
                  <span>{{news[0].create_time}}</span>
                </div>
                <div class="news-content">{{item.content | filtersHtml}}</div>
                <div class="news-info">
                  <span>
                    <i class="el-icon-view"></i>
                    阅读{{item.volume}}
                  </span>
                  <span>
                    编辑人：
                    {{item.uid|| '作者'}}
                  </span>
                  <span style="color:#f52">立即查看>></span>
                </div>
              </div>
            </div>
          </template>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import banner from "@/assets/image/a.jpg";
export default {
  components: {
    videoPlayer: () => import("@/components/comVideo")
  },
  data() {
    return {
      banner,
      carousel: [],
      news: [],
      form: {
        name: null, //姓名
        mobile: null, //电话
        weixin: null, //微信
        qq: null //qq
      },
      bandGoodes: [
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h1.png",
          title: "万款产品任你挑"
        },
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h2.png",
          title: "定时更新"
        },
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h3.png",
          title: "一件代发"
        },
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h4.png",
          title: "七天无理由"
        },
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h5.png",
          title: "闪电发货"
        },
        {
          pic: "http://www.taoledou.cn/public/home/static/img/h6.png",
          title: "品牌货源"
        }
      ],
      bandServed: [
        {
          color: "#90dfaa",
          title: "品牌打造",
          pic: "/dist/img/icons/icon1.png",
          doc: "多家品牌商合作，打造专属品牌"
        },
        {
          color: "#93b4fc",
          title: "辅助运营",
          pic: "/dist/img/icons/icon2.png",
          doc: "金牌导师手把手教学，全程辅助运营，快速提升业绩"
        },
        {
          color: "#c3d22f",
          title: "活动申报",
          pic: "/dist/img/icons/icon3.png",
          doc: "频台活动策划和申报创意H5活动海报提供"
        },
        {
          color: "#80b740",
          title: "店铺入住",
          pic: "/dist/img/icons/icon4.png",
          doc: "高效入住各大平台，专业电商团队"
        },
        {
          color: "#34c767",
          title: "课程培训",
          pic: "/dist/img/icons/icon5.png",
          doc: "体系化课程金牌讲师系统教学"
        },
        {
          color: "#45a549",
          title: "精选货源",
          pic: "/dist/img/icons/icon6.png",
          doc: "多家精选货源商 签约合作 万款产品一件代发"
        },
        {
          color: "#049de0",
          title: "内容策划",
          pic: "/dist/img/icons/icon7.png",
          doc: "资深策划团队 定制专属创意 视频内容"
        },
        {
          color: "#008d80",
          title: "数据分析",
          pic: "/dist/img/icons/icon8.png",
          doc: "通过大数据解析 市场行情优化 店铺打造爆款"
        }
      ],
      swiperOption: {
        a: {
          autoplay: {
            delay: 4000
          },
          slidesPerView: 5,
          spaceBetween: 10,
          loop: false
        },
        b: {
          autoplay: {
            delay: 2500
          },
          slidesPerView: 5,
          spaceBetween: 10,
          loop: false
        }
      },
      swiper: {
        a: [
          { pic: "http://www.taoledou.cn/public/home/static/img/z1.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z2.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z3.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z4.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z5.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z6.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z7.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z8.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z9.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z10.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z11.jpg" },
          { pic: "http://www.taoledou.cn/public/home/static/img/z12.png" }
        ],
        b: [
          { pic: "http://www.taoledou.cn/public/home/static/img/jl.png" },
          { pic: "http://www.taoledou.cn/public/home/static/img/lj.png" },
          { pic: "http://www.taoledou.cn/public/home/static/img/lqs.png " },
          { pic: "http://www.taoledou.cn/public/home/static/img/mq.png " },
          { pic: "http://www.taoledou.cn/public/home/static/img/oy.png " },
          { pic: "http://www.taoledou.cn/public/home/static/img/sg.png " },
          { pic: "http://www.taoledou.cn/public/home/static/img/yx.png" },
          { pic: "http://www.taoledou.cn/public/home/static/img/zl.png" },
          { pic: "http://www.taoledou.cn/public/home/static/img/hbl.png" },
          { pic: "http://www.taoledou.cn/public/home/static/img/hz.png " }
        ]
      }
    };
  },
  async created() {
    // 轮播
    let { data: carousel } = await this.fnAxios("/homes/index/lun");
    if (carousel.code) {
      this.carousel = carousel.data;
      // this.$route.meta.title = carousel.key.y_title;
      this.$route.meta.keywords = carousel.key.keyword;
      this.$route.meta.description = carousel.key.content;
    }
    let { data: news } = await this.fnAxios("/homes/index/news");
    if (news.code) {
      this.news = news.data;
    }
  },
  methods: {
    onDetails(id) {
      this.$router.push("/online/details/" + id);
    },
    async onSave() {
      let { data } = await this.fnAxios("/homes/index/add", {
        params: this.form
      });
      if (data.code) {
        this.$message.success(data.msg);
        this.form = {
          name: null,
          mobile: null,
          weixin: null,
          qq: null
        };
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
.video {
  margin: 0 auto;
  max-width: 70%;
}
.scale-box {
  margin-bottom: 60px;
  padding-bottom: 31.25%;
}
.title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
}
.band-image {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-bottom: 60px;
  .el-image {
    margin: 5px;
  }
}
.band-goodes {
  // background: #f6f0e4;
  // padding: 40px 0;
  position: relative;
  margin: 50px 0;
  .box {
    display: grid;
    grid-template-columns: 32% 32% 32%;
    grid-gap: 20px 1%;
    margin-bottom: 60px;

    .item {
      text-align: center;
      font-size: 20px;
      .el-image {
        width: 30%;
      }
    }
  }
}
.band-served {
  padding: 40px 0;
  .title {
    margin: 0;
  }
  .subtitle {
    text-align: center;
    font-size: 16px;
  }
  .box {
    display: grid;
    grid-template-columns: 24% 1fr 1fr 1fr;
    grid-gap: 40px 1%;
    @media screen and (max-width: 992px) {
      grid-template-columns: 49% 1fr;
    }
    .item {
      background: #fcfcfc;
      // max-width: 200px;
      .item-title {
        height: 50px;
        background: #90dfaa;
        color: #fff;
        font-size: 18px;
        text-align: center;
        line-height: 50px;
      }
      .el-image {
        width: 110px;
        height: 110px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin: 0 auto;
      }
      .item-doc {
        text-align: center;
        height: 60px;
      }
      .item-button {
        background: #f1f1f1;
        padding: 10px 0;
        .button {
          width: 80%;
          height: 30px;
          line-height: 30px;
          border-radius: 15px;
          margin: 0 auto;
          text-align: center;
          background: #90dfaa;
          color: #fff;
        }
      }
    }
  }
}
.band-tutor {
  margin: 50px 0;
  .subtitle {
    text-align: center;
    font-size: 16px;
  }
  .el-col {
    margin-bottom: 40px;
  }
}
.band-zixun {
  padding: 80px 0;
  margin-bottom: 50px;
  background: url("~@/assets/image/bg.jpg") no-repeat top center / 100% 100%;
  color: #fff;
  overflow: hidden;
  .title {
    border-bottom: 3px solid #ec3;
    padding-bottom: 20px;
  }
  .item {
    display: flex;
    align-items: center;
    margin: 25px 0;
    span {
      width: 20%;
      text-align: right;
      margin-right: 10px;
      min-width: 70px;
    }
    input {
      flex: 1;
      border: none;
      background: #dde0ee50;
      height: 40px;
      border-radius: 3px;
      text-indent: 16px;
      color: #fff;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers 适配谷歌 */
      color: #fff;
    }
    input:-moz-placeholder {
      /* Mozilla Firefox 4 to 18 适配火狐 */
      color: #fff;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+ 适配火狐 */
      color: #fff;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+  适配ie*/
      color: #fff;
    }
  }
  button {
    border: none;
    background: #ec3;
    border-radius: 5px;
    color: #fff;
    flex: 1;
    height: 36px;
    outline: none;
  }
}
.band-news {
  margin-bottom: 60px;
  .news-first {
    cursor: pointer;
    .el-image {
      width: 100%;
      height: 350px;
    }
    .news-first-title {
      height: 40px;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .news-first-title-a {
        flex: 1;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .news-box {
    height: 170px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
    cursor: pointer;
    .el-image {
      margin-right: 10px;
      flex: 2;
    }
    .news-item {
      flex: 3;
      .news-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span:first-child {
          flex: 1;
          height: 20px;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          max-width: 180px;
        }
      }
      .news-content {
        margin: 10px 0;
        .line-hidden(3);
      }
      .news-info {
        height: 40px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>