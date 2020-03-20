<!--
    Name：   支付收银台
    Author： 
    Create time：2020-03-03
    Update time：
-->
<template>
  <el-row>
    <el-col
      :xs="{span:22,offset:1}"
      :sm="{span:20,offset:2}"
      :md="{span:16,offset:4}"
      :lg="{span:12,offset:6}"
    >
      <div class="title">订单信息</div>
      <el-row>
        <el-col :xs="{span:22}" :sm="{span:12}" :md="{span:12}" :lg="{span:12}">
          <!-- <el-image :src="order.pic" class="image" /> -->
          <el-image
            src="http://www.taoledou.cn/uploads/pictrue/20191118/1872f0ed4a4d4e69a3439e3cf7ddb8e4.jpg"
            class="image"
          />
        </el-col>
        <el-col :xs="{span:22,offset:1}" :sm="{span:12}" :md="{span:12}" :lg="{span:12}">
          <div class="info-box" v-if="order">
            <div>
              <span>服务名称:</span>
              {{order.name}}
            </div>
            <div>
              <span>订单编号:</span>
              {{order.order_on}}
            </div>
            <div>
              <span>创建日期:</span>
              {{order.create_time}}
            </div>
            <div>
              <span>服务价格:</span>
              <span class="price">￥{{order.money}}元</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col class="pay">
          <el-image
            @click="onPay('weixin')"
            :class="{active:select == 'weixin'}"
            src="http://www.taoledou.cn/public/home/static/img/wei.png"
          />
          <el-image
            @click="onPay('zhifubao')"
            :class="{active:select == 'zhifubao'}"
            src="http://www.taoledou.cn/public/home/static/img/zhi.png"
          />
        </el-col>
        <el-col class="button">
          <el-button type="primary" @click.stop="toPay" :loading="loading">立即支付</el-button>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      order: {},
      select: "weixin",
      loading: false
    };
  },
  beforeMount() {
    let key = this.$route.params.id;
    this.order = this.fnStorage.getStore("order" + key);
  },
  methods: {
    onPay(val) {
      this.select = val;
    },
    isMobile() {
      let flag = window.navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      return flag;
    },
    async toPay() {
      let options = {
        id: this.order.id,
        payment_type: this.select
      };
      this.loading = true;
      let { data } = await this.fnAxios("/homes/Personal/pay", {
        params: options
      });
      this.loading = false;
      if (this.select == "weixin") {
        if (this.isMobile()) {
          if (data.h5) window.open(data.h5, "_blank");
        } else {
          this.fnStorage.setStore("pay", data);
          let path = this.$router.replace("/weiPay");
        }
      }
      if (data.code && this.select == "zhifubao") {
        window.open(data.zfb, "_blank");
      }
      this.fnStorage.remove("order" + this.$route.params.id);
    }
  }
};
</script>
 <style lang='less' scoped>
.title {
  height: 40px;
  border-bottom: 1px solid #ccc;
  line-height: 40px;
  font-size: 18px;
  color: #f52;
  text-align: center;
  margin-bottom: 20px;
}
.image {
  margin: 10px auto;
  text-align: center;
  display: flex;
  justify-content: center;
  max-height: 300px;
  max-width: 300px;
}
.info-box {
  display: flex;
  justify-content: center;
  flex-direction: column;
  height: 300px;
  @media screen and (max-width: 768px) {
    height: auto;
  }
  div {
    min-height: 40px;
    line-height: 40px;
    span {
      margin-right: 20px;
    }
  }
}
.pay {
  display: flex;
  justify-content: center;
  align-items: center;
  .el-image {
    width: 100px;
    height: 100px;
    border: 2px solid #ccc;
    padding: 10px;
    margin: 20px;
    &.active {
      border-color: #f52;
    }
  }
}
.button {
  text-align: center;
  margin-bottom: 40px;
  .el-button {
    width: 200px;
  }
}
</style>