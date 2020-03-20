<!--
    Name：   服务市场
    Author： 
    Create time：2020-03-01
    Update time：
-->
<template>
  <div>
    <el-row>
      <template v-for="(item,index) in arr">
        <el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4" :key="index">
          <div class="box" @click="onDetails(item.id)">
            <el-image :src="item.pic" fit="contion" />
            <div class="info">
              <span class="title">{{item.title}}</span>
              <span class="price">￥{{item.money}}元</span>
            </div>
          </div>
        </el-col>
      </template>
    </el-row>
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
      arr: []
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData(page = 1, type = false) {
      let userInfo = this.fnStorage.getStore("user");
      let options = {
        params: {
          limit: this.page.size,
          uid: userInfo.id,
          page
        }
      };
      let { data } = await this.fnAxios("/homes/Personal/market?", options);
      if (data.code) {
        this.page.total = data.count;
        if (!type) this.arr = data.data;
        else this.arr = this.arr.concat(data.data);
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
    onDetails(id) {
      this.$router.push("service/details/" + id);
    }
  }
};
</script>
<style lang='less' scoped>
.box {
  box-shadow: 0 0 10px #ccc;
  margin: 10px 10px 20px;
  transition: all 0.2s;
  cursor: pointer;
  &:hover {
    transition: all 0.2s;
    box-shadow: 0 0 10px #666;
  }
}
.info {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  .title {
    flex: 1;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
  .price {
    color: #e33;
    font-weight: bold;
  }
}
</style>