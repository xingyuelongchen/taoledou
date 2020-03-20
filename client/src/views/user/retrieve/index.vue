<!--
    Name：   找回密码
    Author： 
    Create time：2020-02-28
    Update time：
-->
<template>
  <div>
    <el-row class="hidden-sm-only">
      <el-col :span="24">
        <div class="box">
          <div class="item">
            <div class="title">重置密码</div>
            <el-form class="form" :model="form">
              <el-form-item prop="mobile">
                <el-input
                  prefix-icon="el-icon-mobile-phone"
                  v-model="form.mobile"
                  placeholder="请输入手机号码"
                ></el-input>
              </el-form-item>
              <el-form-item prop="code">
                <el-input prefix-icon="el-icon-lock" v-model="form.code" placeholder="请输入验证码">
                  <template slot="append">
                    <el-link :underline="false" :disabled="!!isCode" @click="getCode">
                      获取验证码
                      <i v-if="isCode">({{isCode}})</i>
                    </el-link>
                  </template>
                </el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入密码"></el-input>
              </el-form-item>
            </el-form>
            <div class="info">
              <el-link :underline="false" @click.native.stop="to('/user/register')">重新注册</el-link>
              <el-link :underline="false" @click.native.stop="to('/user/login')">立即登陆</el-link>
            </div>
            <el-button type="primary" style="width:100%" @click="retrieve">确认完成</el-button>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="hidden-md-and-up">
      <el-col>
        <div class="item">
          <div class="title">重置密码</div>
          <el-form class="form" :model="form">
            <el-form-item prop="mobile">
              <el-input
                prefix-icon="el-icon-mobile-phone"
                v-model="form.mobile"
                placeholder="请输入手机号码"
              ></el-input>
            </el-form-item>
            <el-form-item prop="code">
              <el-input prefix-icon="el-icon-lock" v-model="form.code" placeholder="请输入验证码">
                <template slot="append">
                  <el-link :underline="false" :disabled="!!isCode" @click="getCode">
                    获取验证码
                    <i v-if="isCode">({{isCode}})</i>
                  </el-link>
                </template>
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input prefix-icon="el-icon-lock" v-model="form.password" placeholder="请输入密码"></el-input>
            </el-form-item>
          </el-form>
          <div class="info">
            <el-link :underline="false" @click.native.stop="to('/user/register')">重新注册</el-link>
            <el-link :underline="false" @click.native.stop="to('/user/login')">立即登陆</el-link>
          </div>
          <el-button type="primary" style="width:100%" @click="retrieve">确认完成</el-button>
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
      form: { phone: null, password: null, code: null },
      isCode: 0
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
    async retrieve() {
      let { data } = await this.fnAxios("/homes/login/xpass", {
        params: this.form
      });
      if (data.code) {
        this.$message.success(data.msg);
        this.$router.replace("/user/login");
      } else {
        this.$message.success(data.msg);
      }
    },
    async getCode() {
      this.isCode = 60;
      let that = this;
      a();
      let { data } = await this.fnAxios("/homes/login/wpass", {
        params: { mobile: this.form.mobile }
      });
      function a() {
        let timer = setTimeout(() => {
          that.isCode -= 1;
          if (that.isCode == 0) clearTimeout(timer);
          else a();
        }, 1000);
      }
    }
  }
};
</script>
<style lang='less' scoped>
.box {
  background: url("http://www.taoledou.cn/public/home/static/img/load_bg.jpg")
      no-repeat top left / 100% 100%,
    #f9f9f9;
  min-height: 500px;
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
    margin: 20px 0;
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