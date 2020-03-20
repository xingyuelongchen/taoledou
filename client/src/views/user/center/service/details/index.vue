<!--
    name：装修风格模板详情介绍页
    Author： 
    Create time：2020-02-25
    Update time：
-->
<template>
  <div class="container">
    <el-row class="hidden-xs-only">
      <el-col>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <template v-for="(item,index) in navList">
            <el-breadcrumb-item :to="item" :key="index">{{item.title}}</el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row class="shop-details">
      <el-col :xs="24" :sm="{span:8}">
        <el-image class="template-image" :src="obj.pic" :key="obj.pic" />
      </el-col>
      <el-col :xs="24" :sm="{span:15,push:1}" class="template-details">
        <span class="template-title hidden-xs-only">{{obj.title}}</span>
        <div class="hidden-xs-only">
          <div class="template-attr">
            <p>
              <span>市场价：</span>
              <span class="price">
                ￥
                <span>{{obj.money | price}}</span>
              </span>
            </p>
          </div>
          <el-button type="primary" @click="onPlay">立即购买</el-button>
        </div>
        <div class="hidden-sm-and-up">
          <p>{{obj.title}}</p>
          <p class="button">
            <span class="price">
              ￥
              <span>{{obj.money | price}}</span>
            </span>
            <el-button type="primary" @click="onPlay">立即购买</el-button>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row class="template-description">
      <el-col class="template-preview">
        <el-divider class="el-divider">详情描述</el-divider>
        <!-- 描述 -->
        <div v-html="obj.content"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      obj: {}
    };
  },
  created() {
    this.getData(this.$route.params.id);
  },
  computed: {
    navList() {
      return this.$route.matched.map(k => {
        return { title: k.meta.title, path: k.path || "/" };
      });
    }
  },
  methods: {
    async onPlay() {
      let { data } = await this.fnAxios("/homes/Personal/order?id=" + this.$route.params.id
      );
      if (data.code) {
        let key = Math.ceil(Math.random() * 10);
        this.fnStorage.setStore("order" + key, data.data);
        this.$router.push("/pay/" + key);
      }
    },
    async getData(id) {
      let { data } = await this.fnAxios("/homes/Personal/merketdetail?id=" + id);
      if (data.code) {
        this.obj = data.data;
      }
    }
  },
  filters: {
    price(val) {
      try {
        val *= 1;
        return val.toFixed(2);
      } catch (error) {
        return val;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.el-breadcrumb {
  margin: 40px 0;
}
.button {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 50px;
  .price {
    color: #e00;
    font-weight: bold;
    span {
      font-size: 30px;
    }
  }
}
.template-image {
  width: 100%;
  max-height: 400px;
  border: 1px solid #eee;
}
.template-title {
  font-size: 18px;
}
.template-attr {
  font-size: 14px;
  color: #888;
  background: #f5f5f5;
  height: 120px;
  padding: 20px;
  margin: 20px 0;
  .el-icon-view {
    margin-right: 10px;
  }
  .price {
    color: #e00;
    font-weight: bold;
    span {
      font-size: 30px;
    }
  }
}
.template-details {
  @media screen and (max-width: 992px) {
    text-align: center;
    margin: 10px 0;
  }
}
.template-description {
  margin-top: 50px;

  .template-recommend {
    border: 1px solid #eee;
    .el-image {
      max-height: 300px;
      margin: 20px 5px;
    }
  }
  .template-preview {
    border: 1px solid #eee;
    text-align: center;
  }
}
</style>