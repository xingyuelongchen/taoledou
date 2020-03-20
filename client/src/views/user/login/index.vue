
<template>
  <div @keydown.enter="login">
    <el-row class="hidden-sm-and-down">
      <el-col :span="24">
        <div class="box">
          <div class="item">
            <div class="title">手机号登陆</div>
            <el-form class="form" :model="form">
              <el-form-item prop="mobile">
                <el-input
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.mobile"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input
                  prefix-icon="el-icon-lock"
                  v-model="form.password"
                  type="password"
                  placeholder="请输入密码"
                ></el-input>
              </el-form-item>
            </el-form>
            <div class="info">
              <el-link :underline="false" @click.native.stop="to('/user/register' )">立即注册</el-link>
              <el-link :underline="false" @click.native.stop="to('/user/retrieve')">忘记密码</el-link>
            </div>
            <el-button type="primary" style="width:100%" @click="login">立即登陆</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="hidden-md-and-up">
      <el-col>
        <div class="item">
          <div class="title">手机号登陆</div>
          <el-form class="form" :model="form">
            <el-form-item prop="mobile">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                v-model="form.mobile"
                placeholder="请输入手机号码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                prefix-icon="el-icon-lock"
                v-model="form.password"
                type="password"
                placeholder="请输入密码"
              ></el-input>
            </el-form-item>
          </el-form>
          <div class="info">
            <el-link :underline="false" @click.native.stop="to('/user/register' )">立即注册</el-link>
            <el-link :underline="false" @click.native.stop="to('/user/retrieve')">忘记密码</el-link>
          </div>
          <el-button type="primary" style="width:100%" @click.native="login">立即登陆</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <p style="text-align:center">
          淘乐逗版权所有 © 2008-2019 ICP证：
          <a
            href="http://icp.chinaz.com/info?q=%E8%9C%80ICP%E5%A4%8719028568%E5%8F%B7-1"
            style="color:#000000"
            target="_blank"
          >蜀 19028568号-1</a>
        </p>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: { mobile: "", password: "" }
    };
  },
  created() {
    let isLogin = this.fnStorage.getStore("user");
    if (isLogin && JSON.stringify(isLogin) !== "{}") {
      this.$router.replace("/");
    }
  },
  methods: {
    to(path) {
      this.$router.push(path);
    },
    async login() {
      // console.log(this.fnAxios);
      let { data } = await this.fnAxios("/homes/login/login", {
        method: "post",
        params: this.form,
        data: {}
      });
      if (data.code) {
        this.fnStorage.setStore("user", data.data);
        this.$store.commit("setUser", data.data);
        this.$router.back();
      }
    }
  }
};
</script>
<style lang='less' scoped>
.top {
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 26px;
  border-bottom: 1px solid #eee;
}
.box {
  background: url("http://www.taoledou.cn/public/home/static/img/load_bg.jpg")
      no-repeat top left / 100%,
    #f9f9f9;
  height: 530px;
  position: relative;
  .item {
    position: absolute;
    top: 40px;
    right: 17%;
    min-width: 275px;
    min-height: 340px;
    max-width: 400px;
    max-height: 500px;
    background: #fff;
    width: 20%;
    height: 37%;
  }
}
.item {
  padding: 0 40px;
  .title {
    margin: 40px 0;
    text-align: center;
    font-size: 20px;
    color: #f52;
  }
  .info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>