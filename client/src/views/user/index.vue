<template>
  <div>
    <el-row class="app-user-header">
      <el-col :xs="{span:22,offset:1}">
        <div class="top container">
          <div class="logo">
            <router-link to="/index">
              <img src="http://www.taoledou.cn/public/home/static/img/logo.png" alt="淘乐逗" />
            </router-link>
            <div class="title">{{$route.meta.title}}</div>
          </div>
          <!-- 右边用户信息 -->
          <div>
            <div v-if="userInfo && JSON.stringify(userInfo) !== '{}'" class="right">
              <el-avatar class="hidden-xs-only" :src="userInfo.pic && userInfo.pic || '#'"></el-avatar>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <span class="hidden-sm-and-up">
                    <i class="el-icon-more" style="font-size:26px"></i>
                  </span>
                  <span class="hidden-xs-only">
                    {{ userInfo.nickname}}
                    <i class="el-icon-caret-bottom"></i>
                  </span>
                </span>
                <el-dropdown-menu class="hidden-xs-only" :hide-on-click="false">
                  <template v-for="(item,index) in menuList">
                    <el-dropdown-item
                      v-if="!item.mobile "
                      :key="index"
                      @click.native="tab(item)"
                    >{{item.meta.title}}</el-dropdown-item>
                  </template>
                  <el-dropdown-item divided @click.native.stop="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu class="hidden-sm-and-up">
                  <template v-for="(item,index) in menuList">
                    <el-dropdown-item
                      :key="index"
                      v-if="!(item.path == 'sign' && userInfo.status ==1)"
                      @click.native="tab(item)"
                    >{{item.meta.title}}</el-dropdown-item>
                  </template>
                  <el-dropdown-item divided @click.native.stop="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <router-view />
  </div>
</template>
<script>
import user from "@/router/user";
import { mapState } from "vuex";
export default {
  data() {
    return {
      menuList: user[0].children
    };
  },
  beforeCreate() {
    this.$store.commit("setUser", this.fnStorage.getStore("user"));
  },
  computed: mapState(["userInfo"]),
  methods: {
    tab(item) {
      this.$router.push("/user/center/" + item.path);
    },
    logout() {
      this.fnAxios("/homes/login/logOut");
      this.fnStorage.remove("user");
      this.$store.commit("setUser", {});
      this.$router.back();
    }
  }
};
</script>
<style lang="less" scoped>
.app-user-header {
  border-bottom: 1px solid #eee;
  .top {
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 26px;
    .logo {
      display: flex;
      .title {
        margin: 0 20px;
      }
    }
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > * {
        margin-right: 20px;
      }
    }
  }
}
</style>