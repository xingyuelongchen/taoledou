
<template>
  <div class="layout">
    <!-- 顶部 -->
    <div class="app-header">
      <el-row class="container" type="flex" justify="space-between">
        <el-col :span="4">
          <div class="logo">
            <router-link to="/index">
              <img src="http://www.taoledou.cn/public/home/static/img/logo.png" alt="淘乐逗" />
            </router-link>
          </div>
        </el-col>
        <el-col :span="19" :offset="1">
          <div class="menu hidden-xs-only">
            <ul class="nav">
              <template v-for="(item,index) in route">
                <router-link
                  tag="li"
                  class="item"
                  v-if="item.isShow !== false"
                  :class="{'active': $route.fullPath.split('/').indexOf(item.path)==1}"
                  :key="index"
                  :to="'/'+item.path"
                >{{item.meta.title}}</router-link>
              </template>
              <li v-if="!isLogin" class="item" @click="onLogin">登陆</li>
              <li v-else class="item" @click.prevent="onLogin">
                个人中心 |
                <el-link :underline="false" @click.stop.native="logout">退出</el-link>
              </li>
            </ul>
          </div>
          <div class="menu hidden-sm-and-up">
            <div style="text-align:right">
              <i
                :class="[isShowMenu?'el-icon-close':'el-icon-menu','menu-icon']"
                @click="isShowMenu=!isShowMenu"
              ></i>
            </div>
            <el-drawer
              title
              direction="ltr"
              :visible.sync="isShowMenu"
              :with-header="false"
              :modal="false"
              :show-close="true"
            >
              <ul class="mobile">
                <template v-for="(item,index) in route">
                  <router-link
                    tag="li"
                    class="item"
                    v-if="item.isShow !== false"
                    :class="{'active': $route.fullPath.split('/').indexOf(item.path)==1}"
                    :key="index"
                    :to="'/'+item.path"
                    @click.native="isShowMenu=!isShowMenu"
                  >{{item.meta.title}}</router-link>
                </template>
                <li v-if="!isLogin" class="item" @click="onLogin">用户登陆</li>
                <template v-else>
                  <li class="item" @click="onLogin">个人中心</li>
                  <li class="item" @click="logout">退出登陆</li>
                </template>
              </ul>
            </el-drawer>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="qq hidden-xs-only">
      <div class="click" @click.stop="show = !show">在线客服</div>
      <transition name="a">
        <div class="content" v-show="show">
          <div style="margin: 10px;" class="transition-box">
            <div class="kf">
              <div class="title">QQ在线客服</div>
              <div class="item">
                <a
                  target="_blank"
                  href="http://wpa.qq.com/msgrd?v=3&uin=3007562280&site=qq&menu=yes"
                >
                  <img
                    border="0"
                    src="http://wpa.qq.com/pa?p=2:3007562280:52"
                    alt="点击这里给我发消息"
                    title="点击这里给我发消息"
                  />
                  售前咨询
                </a>
              </div>
              <div class="item">
                <a
                  target="_blank"
                  href="http://wpa.qq.com/msgrd?v=3&uin=3007558977&site=qq&menu=yes"
                >
                  <img
                    border="0"
                    src="http://wpa.qq.com/pa?p=2:3007558977:52"
                    alt="点击这里给我发消息"
                    title="点击这里给我发消息"
                  />
                  创业指导
                </a>
              </div>
              <div class="item">
                <a
                  target="_blank"
                  href="http://wpa.qq.com/msgrd?v=3&uin=3007558979&site=qq&menu=yes"
                >
                  <img
                    border="0"
                    src="http://wpa.qq.com/pa?p=2:3007558979:52"
                    alt="点击这里给我发消息"
                    title="点击这里给我发消息"
                  />
                  投诉建议
                </a>
              </div>
            </div>
            <div class="ts" @click="$router.push('/about/3')">
              <!--  -->
              投诉建议
            </div>
            <div class="dh">
              <div class="title">电话咨询</div>
              <div>400-091-6089</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <router-view class="app-content" />
    <footer class="app-footer hidden-xs-only">
      <div class="logo">
        <img src="http://www.taoledou.cn/public/home/static/img/logo1.png" alt />
      </div>
      <ul class="foot-menu">
        <template v-for="(item,index) in route">
          <router-link
            v-if="item.isShow !==false"
            tag="li"
            :class="{'item':true,'active':$route.path == item.path}"
            :key="index"
            :to="'/'+item.path"
          >{{item.meta.title}}</router-link>
        </template>
      </ul>
      <p>
        <span>投诉电话：400-0916-089</span>
        官网投诉邮箱：tousu@taoledou.cn
      </p>
      <p>
        <span>版权所有 © 四川淘乐逗科技有限公司 保留一切权利</span>
        网站备案：
        <a
          href="http://icp.chinaz.com/info?q=%E8%9C%80ICP%E5%A4%8719028568%E5%8F%B7-1"
          style="color:#808080"
          target="_blank"
        >蜀ICP备19028568号-1</a>
      </p>
      <p class="friendship">
        友情链接：
        <template v-for="(item,index) in friendship">
          <a
            class="link"
            :key="index"
            :href="item.url"
            style="color:#808080"
            target="_blank"
          >{{item.title}}</a>
        </template>
      </p>
    </footer>
  </div>
</template>
<script>
import routers from "@/router/page";
export default {
  data() {
    return {
      show: true,
      route: routers,
      isShowMenu: false,
      isLogin: this.fnStorage.getStore("user"),
      friendship: this.fnStorage.getStore("friendship")
    };
  },
  beforeUpdate() {
    this.isLogin = this.fnStorage.getStore("user");
  },
  methods: {
    onLogin() {
      // 验证登陆状态
      let isLogin = this.isLogin;
      isLogin = isLogin && JSON.stringify(isLogin) !== "{}";
      if (isLogin) {
        this.$router.push("/user");
      } else {
        this.$router.push("/user/login");
      }
    },
    logout() {
      this.fnAxios("/homes/login/logOut");
      this.fnStorage.remove("user");
      this.$store.commit("setUser", {});
      this.isLogin = false;
      // this.$router.replace("/");
    }
  }
};
</script>
<style lang="less" scoped>
.layout {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .app-header {
    position: fixed;
    z-index: 200;
    top: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 3px 3px 0 rgba(0, 0, 0, 0.05);
  }

  .container {
    height: 80px;
    font-size: 16px;

    .el-col {
      display: flex;
      align-items: center;
      height: 100%;
      justify-content: space-between;
      .menu {
        width: 100%;
        // text-align: right;
        .menu-icon {
          padding: 20px;
        }
        .mobile {
          .item {
            margin: 20px;
            height: 30px;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 2px solid transparent;
            &:hover,
            &.active {
              color: #ff5722;
              transition: all 0.2s;
              border-bottom: 2px solid #ff5722;
            }
          }
        }
        .nav {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .item {
            padding: 28px 0;
            cursor: pointer;
            transition: all 0.2s;
            border-bottom: 2px solid transparent;
            &:hover,
            &.active {
              color: #ff5722;
              transition: all 0.2s;
              border-bottom: 2px solid #ff5722;
            }
          }
        }
      }
    }
  }
  .app-footer {
    height: 300px;
    background: #2f2f2f;
    color: #808080;
    transition: all 0.2s;
    font-size: 16px;
    > * {
      text-align: center;
    }
    .logo {
      margin: 40px 0;
      overflow: hidden;
    }
    .foot-menu {
      width: 85%;
      height: 30px;
      border-bottom: 1px solid #808080;
      margin: 0 auto;
      overflow: hidden;
      display: flex;
      justify-content: center;
      > .item {
        transition: all 0.2s;
        margin: 0 10px;
        &:hover {
          color: #fff;
          transition: all 0.2s;
          cursor: pointer;
        }
      }
    }
    a {
      text-decoration: none;
    }
    p > span {
      margin-right: 20px;
    }
    .friendship {
      white-space: pre-wrap;
      a.link {
        margin: 0 10px;
      }
    }
  }
  .app-content {
    flex: 1 1 auto;
    margin-top: 80px;
  }
  .qq {
    position: fixed;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 20;
    margin: auto;
    display: flex;
    align-items: center;
    .content {
      border-radius: 5px;
      background: rgb(0, 160, 233);
      color: rgb(0, 160, 233);
      a {
        color: rgb(0, 160, 233);
        text-decoration: none;
      }
      .item {
        display: flex;
        align-items: center;
      }
    }
    .click {
      position: absolute;
      left: -30px;
      color: #fff;
      width: 20px;
      text-align: center;
      padding: 5px;
      background: #00a0e9;
      top: 0;
      bottom: 0;
      height: 80px;
      border-radius: 5px 0 0 5px;
      margin: auto;
      cursor: pointer;
    }
    .title {
      border-bottom: 1px solid rgb(0, 160, 233, 0.5);
      padding: 10px 0;
      margin: 10px 0;
    }
    .kf {
      background: #fff;
      border-radius: 5px;
      padding: 0 10px 10px;
      font-size: 12px;
      .item a {
        display: flex;
        align-items: center;
      }
    }
    .ts {
      padding: 15px 5px;
      background: #fff;
      border-radius: 5px;
      margin: 5px 0;
      cursor: pointer;
    }
    .dh {
      background: #fff;
      border-radius: 5px;
      padding: 0 5px 5px;
    }
  }
  .a-enter,
  .a-leave-to {
    margin-right: -117px;
  }
  .a-enter-active,
  .a-leave-active {
    transition: all 1s;
  }
}
</style>
