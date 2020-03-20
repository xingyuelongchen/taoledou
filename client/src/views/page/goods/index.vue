<!--
    Name：   货源中心
    Author： 
    Create time：2020-02-27
    Update time：
-->
<template>
  <div>
    <el-row class="menu-top hidden-xs-only">
      <!-- 大屏菜单banner栏 -->
      <el-col :span="24">
        <el-carousel :interval="5000" arrow="hover" height="100%" indicator-position="none">
          <el-carousel-item v-for="item in carousel" :key="item.pic">
            <el-image :src="item.pic" fit="cover" style="width:100%"></el-image>
          </el-carousel-item>
        </el-carousel>
      </el-col>
      <el-col class="container menu-list" @mouseleave.native="onMouse(null)">
        <div class="box">
          <div class="title">货源一站式分类服务</div>
          <ul class="list">
            <template v-for="(item,index) in menuList">
              <li
                class="item"
                :key="index"
                @click.stop="onGroup(item.id)"
                @mouseenter="onMouse(item.id)"
              >
                {{item.title}}
                <i class="el-icon-arrow-right"></i>
              </li>
            </template>
          </ul>
          <transition name="el-fade-in-linear">
            <div class="popup transition-box" v-if="menuPpopup">
              <div class="title">{{menuChild.title}}</div>
              <div class="content">
                <template v-for="(item,index) in menuChild.child">
                  <el-link
                    :key="index"
                    :underline="false"
                    @click="onGroup(item.id,true)"
                  >{{item.title}}</el-link>
                </template>
              </div>
              <div class="like">
                <div>猜你喜欢</div>
                <div class="like-content">
                  <template v-for="(k,i) in menuChild.child1">
                    <el-image :key="i" :src="k.pic" @click="onDetails(k.id)" />
                  </template>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </el-col>
    </el-row>
    <el-row class="hidden-sm-and-up">
      <!-- 小屏菜单banner栏 -->
      <el-col :span="24">
        <div class="mobile-menu">
          <div>
            <div class="menu-list">
              <el-link
                :underline="false"
                v-for="(item,index) in menuList "
                :key="index"
                @click="onMouse(item.id)"
              >{{item.title}}</el-link>
            </div>
          </div>
        </div>
        <div class="mobile-item">
          <div class="mobile-menu">
            <div>
              <div class="menu-list">
                <el-link
                  :underline="false"
                  v-for="(item,index) in menuChild.child "
                  :key="index"
                  @click="onGroup(item.id,'item')"
                >{{item.title}}</el-link>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <div style="background:#f5f5f5">
      <div class="container">
        <el-row class="recommend hidden-sm-and-down">
          <!-- 今日栏目推荐 -->
          <el-col>
            <div class="border between ren-goods">
              <img src="http://www.taoledou.cn/public/home/static/img/s_img1.jpg" />
              <div class="goods">
                <!-- 推荐位置 -->
                <swiper :options="swiperOption" ref="mySwiper">
                  <template v-for="(item,index) in recommendGoods">
                    <swiper-slide :key="index">
                      <div>
                        <el-image :src="item.pic" @click="onDetails(item.id)" fit="cover" />
                        <div class="info">
                          <span>{{item.retail_price | price}}</span>
                          <span>￥?</span>
                        </div>
                      </div>
                    </swiper-slide>
                  </template>
                </swiper>
              </div>
            </div>
            <template v-for="(item,index) in recommendList">
              <!-- <div :key="index" class="box"> -->
              <div class="between" :key="index">
                <div class="background" :style="item">
                  <h1>{{index+1}}F</h1>
                  <div>
                    <i class="el-icon-shopping-cart-1"></i>
                  </div>
                  <span>{{item.title}}/货源</span>
                </div>
                <div class="list" v-if="item.child&&item.child.length">
                  <el-image :src="item.pic" fit="cover" style="width:100%" />
                  <div class="list-item">
                    <template>
                      <el-image
                        :key="i"
                        v-for="(k,i) in item.child"
                        :src="k.pic"
                        @click.native.stop="onDetails(k.id)"
                      />
                    </template>
                  </div>
                </div>
              </div>
              <!-- </div> -->
            </template>
          </el-col>
        </el-row>
        <el-row class="goods">
          <!-- 商品推荐 -->
          <el-col :xs="{span:22,offset:1}" :sm="{span:24 }">
            <el-row :gutter="20">
              <template v-for="(item,index) in goodsList">
                <el-col :key="index" :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
                  <div class="goods-item" @click="onDetails(item.id)">
                    <el-image :src="item.pic" fit="cover" />
                    <div v-text="item.title" class="title"></div>
                    <div class="info">
                      <div class="price">{{item.retail_price | price}}</div>
                      <div class="like">
                        <i class="el-icon-star-on hidden-sm-and-up" style="color:#e33"></i>
                        {{item.count}}
                        <span class="hidden-xs-only">人喜欢</span>
                      </div>
                    </div>
                  </div>
                </el-col>
              </template>
            </el-row>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      menuPpopup: null, //当前悬停菜单ID
      menuList: [], //菜单项
      menuChild: [], //鼠标悬停加载的内容
      likeList: [], //菜单内的猜你喜欢
      goodsList: [], //推荐商品展示
      recommendGoods: [], //今日推荐
      carousel: [], //轮播
      recommendList: [
        {
          id: 1,
          title: "女装",
          background: "#c7b6d7",
          color: "#9175ad"
        },
        {
          id: 2,
          title: "男装",
          background: "#c0e2ef",
          color: "#72bad5"
        },
        {
          id: 3,
          title: "童装",
          background: "#f6d77d",
          color: "#dba64b"
        },
        {
          id: 4,
          title: "孕妇装",
          background: "#e2e5f5",
          color: "#a4addc"
        },
        {
          id: 5,
          title: "女鞋",
          background: "#c7372c",
          color: "#ffb1ab"
        },
        {
          id: 6,
          title: "男鞋",
          background: "#3b778d",
          color: "#96daf3"
        },
        {
          id: 7,
          title: "内衣",
          background: "#eb003b",
          color: "#faacbf"
        },
        {
          id: 8,
          title: "箱包",
          background: "#2e5ea1",
          color: "#529afe"
        }
      ],
      swiperOption: {
        autoplay: true,
        slidesPerView: 4,
        spaceBetween: 10,
        loop: false,
        delay: 3000
      }
    };
  },
  created() {
    this.getClass();
    this.getData();
  },
  mounted() {
    window.onresize = () => {
      let width = window.innerWidth;
      let num = 4;
      if (width >= 1300) {
        num = 4;
      }
      if (width >= 992) {
      }
      this.swiperOption.slidesPerView = num;
    };
  },
  methods: {
    async getClass() {
      let { data } = await this.fnAxios("/homes/goodes/index");
      if (data.code) {
        this.menuList = data.data;
        this.carousel = data.lun;
      }
    },
    async getData() {
      let { data } = await this.fnAxios("/homes/Goodes/recommend");
      if (data.code) {
        this.goodsList = data.rd;
        this.recommendGoods = data.jin;
        this.recommendList = this.recommendList.map((k, i) => {
          return Object.assign({}, k, data.layer[i]);
        });
      }
    },
    onGroup(id, type) {
      this.fnStorage.setStore("banner", this.menuList);
      // 传递banner给列表页
      let path = "group/" + this.menuPpopup;
      type && (path += "/" + id);
      this.$router.push({ path });
    },
    onDetails(id) {
      // 传递banner给列表页

      this.$router.push("details/" + id);
    },
    onMouse(id) {
      this.menuPpopup = id;
      this.menuList.forEach(k => {
        if (k.id == id) this.menuChild = k;
      });
    }
  },
  filters: {
    price(val) {
      try {
        val *= 1;
        return "￥" + val.toFixed(2);
      } catch (error) {
        return val;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.menu-top {
  height: 470px;
  position: relative;
  .el-carousel,
  & > .el-col {
    height: 100%;
  }
  .el-image {
    height: 100%;
    cursor: pointer;
  }
  .menu-list {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    margin: auto;
    right: 0;
    .box {
      position: relative;
      z-index: 2;
      background: #fff;
      width: 180px;
      box-shadow: 0px -10px 10px rgba(0, 0, 0, 0.5);
    }
    .title {
      background: #f52;
      font-size: 18px;
      color: #fff;
      height: 62px;
      line-height: 62px;
      text-align: center;
    }
    .list {
      padding-left: 5px;
      margin: 0;
      .item {
        height: 50px;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        padding-left: 20px;
        padding-right: 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #222;
        font-weight: 600;
      }
    }
    .popup {
      position: absolute;
      left: 100%;
      top: 60px;
      bottom: 0;
      width: 430px;
      height: calc(100% - 60px);
      background: #fff;
      box-shadow: 5px -3px 5px rgba(100, 100, 100, 0.1);
      padding: 0 20px;
      overflow: hidden;
      .title {
        height: 50px;
        background: none;
        border-bottom: 1px solid #f52;
        color: inherit;
        text-align: left;
        font-size: 16px;
      }
      .content {
        .el-link {
          margin: 5px;
          font-size: 12px;
        }
      }
      .like {
        margin-top: 20px;
        .like-content {
          margin-top: 10px;
          height: 110px;
          overflow: hidden;
          display: grid;
          grid-template-columns: repeat(3, 32%);
          grid-template-rows: 110px repeat(auto-fit, 110px);
          grid-gap: 1% 5px;
        }
      }
    }
  }
}
.mobile-menu {
  overflow: hidden;
  height: 40px;
  > div {
    overflow: auto;
    overflow-y: hidden;
    height: 40px;
    width: 100%;
    line-height: 40px;
    background: #f52;
    padding-bottom: 20px;
  }
  .el-link {
    color: #fff;
    margin: 0 10px;
  }
  .menu-list {
    white-space: nowrap;
  }
}
.mobile-item {
  .mobile-menu {
    > div {
      background: #fff;
    }
    .el-link {
      color: #f52;
      margin: 0 10px;
    }
  }
}
.recommend {
  background: #f9f9f9;
  .box {
    width: 100%;
    height: 0px;
    padding-bottom: 40%;
    position: relative;
  }
  .between {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin: 60px 0;
    overflow: hidden;
    background: #fff;
    box-shadow: 0 0 15px #999;
  }
  .ren-goods {
    height: 270px;
    img {
      max-height: 100%;
    }
    .goods {
      width: 100%;
      height: 100%;
      overflow: hidden;
      padding: 0 10px;
      display: flex;
      align-items: center;
      img {
        max-height: 260px;
      }
      .info {
        padding: 0 10px;
        display: flex;
        justify-content: space-between;
        height: 20px;
        span:first-child {
          color: #e33;
        }
        span:last-child {
          text-decoration: line-through;
        }
      }
    }
  }
  .background {
    width: 198px;
    min-width: 198px;
    height: 400px;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    flex-direction: column;
    h1 {
      font-size: 72px;
      font-weight: bold;
      margin: 0;
    }
    i {
      font-size: 72px;
      //   font-weight: bold;
      color: #fff;
    }
    span {
      font-size: 30px;
      color: #fff;
    }
  }
  .list {
    height: 400px;
    overflow: hidden;
    width: 100%;
    > .el-image {
      height: 50%;
    }
    .list-item {
      display: grid;
      grid-template-columns: repeat(5, 19%);
      grid-gap: 1%;
      cursor: pointer;
      align-content: center;
      justify-content: center;
      height: 50%;
    }
  }
  .border {
    border: 1px solid #ccc;
  }
}
.goods {
  padding: 40px 0;
  background: #f5f5f5;
  .goods-item {
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 5px #ccc;
    transition: all 0.2s;
    &:hover {
      transition: all 0.2s;
      box-shadow: 0 0 15px #999;
    }
    .el-image {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
      cursor: pointer;
      /deep/ img {
        position: absolute;
        top: 0;

        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    .title {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 10px 5px;
    }
    .info {
      margin: 0 10px;
      height: 25px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .price {
        color: #e00;
        font-size: 16px;
      }
      .like {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
</style>