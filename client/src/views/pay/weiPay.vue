<!--
    Name：   微信收款
    Author： 
    Create time：2020-03-07
    Update time：
-->
<template>
  <div>
    <el-row class="nav-top">
      <el-col :span="20" :offset="2">您好，欢迎使用微信支付</el-col>
    </el-row>
    <el-row class="head">
      <el-col :span="20" :offset="2" class="title">
        <img src="http://www.taoledou.cn/public/home/static/img/wx.png" />
        <span class="title">微信支付</span>
        <span class="a">我的收银台</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="20" :offset="2">
        <div class="content">
          <div class="qrcode">
            <div class="info">
              <div>
                订单金额：
                <span class="price">￥{{pay.money}}元</span>
              </div>
              <div>
                收款商户：
                <span>淘乐逗专业网店平台</span>
              </div>
              <div>
                剩余支付时间：
                <span class="time">{{Math.floor(index/60)}}分 {{Math.floor(index%60)}}秒</span>
              </div>
              <div class="can">请使用微信扫描二维码付款</div>
            </div>
            <div class="image">
              <img :src="'http://taoledou.cn/qrcode.php?data=' + this.pay.codes" />
            </div>
          </div>
          <div class="msg">
            <img src="http://www.taoledou.cn/public/home/static/img/shouji.png" />
            <div class="cc">打开微信，点击右上角的扫一扫，输入密码，完成支付</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pay: {},
      timer: null,
      index: 360
    };
  },
  async created() {
    this.pay = this.fnStorage.getStore("pay");
    this.getStatus();
  },
  methods: {
    async getStatus() {
      this.index -= 1;
      let { data } = await this.fnAxios(
        "/homes/Personal/order_status?id=" + this.pay.id
      );

      if (this.index == 0 || data.code) {
        clearTimeout(this.timer);
        if (data.code) {
          this.$router.replace("/user");
        } else {
          this.$message.error("支付失败");
          this.$router.replace("/user");
        }
        return;
      }
      this.timer = setTimeout(() => {
        this.getStatus();
      }, 1000);
    }
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
};
</script>
<style lang='less' scoped>
.nav-top {
  background: #000;
  height: 20px;
  text-align: right;
  color: #fff;
  font-size: 12px;
}
.head {
  height: 50px;
  background: #fff;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 2px 5px #ccc;
  .title {
    height: 100%;
    align-items: center;
    display: flex;
    vertical-align: middle;
    .title {
      font-size: 26px;
      margin: 0 10px;
    }
    .a {
      font-size: 16px;
    }
  }
}
.content {
  display: flex;
  margin: 20px 0;
  border-bottom: 1px solid #ccc;
  border-top: 3px solid #ccc;
  justify-content: space-evenly;
  box-shadow: 0 0 10px #eee;

  .qrcode {
    flex: 3;
    .info {
      width: 50%;
      min-width: 200px;
      margin: 0 auto;
      > div {
        margin: 10px;
        font-size: 16px;
        color: #777;
        span {
          color: #333;
          font-size: 18px;
        }
        .time {
          color: #e33;
        }
        .price {
          color: #e33;
          font-size: 22px;
          font-weight: bold;
        }
      }
      .can {
        font-size: 20px;
        margin: 30px;
        font-weight: bold;
        color: #444;
      }
    }
    .image {
      margin: 0 auto;
      width: 200px;
      height: 200px;
      margin: 40px auto;
      .el-image {
        border: 1px solid #ccc;
        width: 100%;
        height: 100%;
      }
    }
  }
  .msg {
    flex: 2;
    background: #f1f1f1;
    padding: 20px;
    .cc {
      margin: 20px;
      font-size: 14px;
    }
  }
}
</style>