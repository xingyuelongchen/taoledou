<!--
    Name：   分类列表
    Author： 
    Create time：2020-02-27
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
              <el-image :src="item.pic" fit="contain" style="width:100%" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row class="nav">
      <el-col :xs="{span:22,offset:1}" :sm="{span:22,offset:1}" :lg="{span:20,offset:2}">
        <span class="title">{{carousel[0].title}}:</span>
        <div class="item">
          <div>
            <el-link @click="onList(null)" :underline="false" :type="!listId ?'primary':''">全部</el-link>
            <template v-for="(item,index) in goodsGroup">
              <el-link
                @click="onList(item.id)"
                :underline="false"
                :type="item.id == listId ?'primary':''"
                :key="index"
              >{{item.title}}</el-link>
            </template>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="goods">
      <!-- 商品推荐 -->
      <el-col :xs="{span:22,offset:1}" :sm="{span:22,offset:1}" :lg="{span:20,offset:2}">
        <el-row :gutter="20">
          <template v-for="(item,index) in goodsList">
            <el-col :key="index" :xs="12" :sm="8" :md="6" :lg="4" :xl="3">
              <div class="goods-item" @click="onDetails(item.id)">
                <el-image :src="item.pic">
                  <div slot="placeholder" class="image-slot">
                    加载中
                    <i class="el-icon-loading"></i>
                  </div>
                </el-image>
                <div v-text="item.title" class="title"></div>
                <div class="info">
                  <div class="price">{{item.retail_price | price}}</div>
                  <div class="like">
                    <i class="el-icon-star-on" style="color:#e33"></i>
                    {{item.count}}
                    <!-- <span class="hidden-xs-only">人喜欢</span> -->
                  </div>
                </div>
              </div>
            </el-col>
          </template>
        </el-row>
      </el-col>
    </el-row>
    <el-col style="text-align:center;margin:40px 0;">
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsList: [], //商品列表
      goodsGroup: [], //分类列表
      groupId: null, //顶级分类id
      listId: null, //次级分类id
      carousel: [], //轮播
      page: {
        total: 0,
        size: 24,
        currentIndex: 1
      }
    };
  },
  created() {
    //   请求分类数据，然后筛选
    this.groupId = this.$route.params.groupId;
    this.listId = this.$route.params.listId || null;
    let banner = this.fnStorage.getStore("banner");
    this.carousel = banner.filter(k => k.id == this.groupId);
    this.getData();
  },
  methods: {
    async getData(page = 1, type = false) {
      let path = `/homes/goodes/goodslists?groupId=${this.groupId}&limit=${this.page.size}&page=${page}`;
      if (this.listId) path += "&two=" + this.listId;
      let { data } = await this.fnAxios(path);
      if (data.code) {
        this.page.total = data.count;
        this.goodsGroup = data.type;
        if (!type) this.goodsList = data.data;
        else this.goodsList = this.goodsList.concat(data.data);
      }
      this.$route.meta.title = data.ke.y_title;
      this.$route.meta.keywords = data.ke.keyword;
      this.$route.meta.description = data.ke.content;
    },
    onList(id) {
      this.listId = id;
      this.getData();
    },
    onDetails(id) {
      this.$router.push({ path: "/goods/details/" + id });
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
.scale-box {
  padding-bottom: 20.75%;
}
.nav {
  border-top: #f5f5f5;
  margin-bottom: 10px;
  > .el-col {
    min-height: 60px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .title {
    font-weight: 600;
    // width: 100px;
    padding-right: 20px;
    white-space: nowrap;
  }
  .item {
    height: 100%;
    overflow: hidden;

    > div {
      width: 100%;
      height: 100%;
      overflow: auto;
      overflow-y: hidden;
      white-space: nowrap;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .el-link {
        padding: 3px 5px;
        margin: 0 5px;
      }
    }
  }
}
.goods {
  padding: 40px 0;
  background: #f5f5f5;
  .goods-item {
    background: #fff;
    margin-bottom: 20px;
    box-shadow: 0 0 15px #ccc;
    transition: all 0.2s;
    cursor: pointer;
    &:hover {
      transition: all 0.2s;
      box-shadow: 0 0 15px #999;
    }
    .el-image {
      width: 100%;
      height: 0;
      padding-bottom: 100%;
      position: relative;
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
        font-size: 12px;
        color: #666;
      }
    }
  }
}
</style>