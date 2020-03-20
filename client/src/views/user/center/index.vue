<!--
    Name：   用户中心
    Author： 
    Create time：2020-02-28
    Update time：
-->
<template>
  <div class="container">
    <el-row class="user">
      <el-col class="hidden-xs-only" :sm="{span:4}">
        <ul class="box">
          <template v-for="(item,index) in menuList">
            <li
              v-if="!item.mobile"
              class="item"
              :class="{'active':isActive(item)}"
              :key="index"
              @click="tab(item)"
            >{{item.meta.title}}</li>
          </template>
        </ul>
      </el-col>
      <el-col :xs="{span:22,offset:1}" :sm="{span:20}" class="user-right">
        <router-view class="user-content" />
      </el-col>
    </el-row>
  </div>
</template>
<script>
import user from "@/router/user";
export default {
  data() {
    return {
      path: "account",
      userInfo: this.fnStorage.getStore("user"),
      menuList: user[0].children
    };
  },
  methods: {
    isActive(item) {
      let a = this.$route.path.split("/").reverse();
      let b = (a && a.length && a[0]) === item.path;
      return b;
    },
    tab(item) {
      this.path = item.path;
      this.$router.push("/user/center/" + item.path);
    }
  }
};
</script>
<style lang='less' scoped>
.user {
  height: calc(100vh - 62px);

  .box {
    min-height: calc(100vh - 62px;);
    background: #fffffe;
    border-left: 1px solid #ccc;
    border-right: 1px solid #f52;
    margin: 0;
    text-align: center;
    font-size: 16px;

    .item {
      height: 30px;
      line-height: 30px;
      padding: 10px 0;
      margin: 1px 0;
      &.active {
        &:after {
          content: " ";
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          display: block;
          width: 0px;
          height: 0px;
          // background: #fff;
          border: 10px solid #f52;
          border-right-color: #fff;
          // transform: rotate(45deg);
        }
      }
      &:hover,
      &.active {
        color: #fff;
        background: #f52;
        margin: 1px -1px;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;
      }
    }
  }
  .user-right {
    @media screen and (min-width: 768px) {
      padding: 20px 0 20px 40px;
    }
    height: 100%;
    overflow: hidden;
    .user-content {
      overflow-y: scroll;
      overflow-x: hidden;
      margin-right: -20px;
      height: 100%;
      padding-right: 20px;
    }
  }
}
</style>