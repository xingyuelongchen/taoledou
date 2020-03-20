<!--
    Name：   在线签合同
    Author： 
    Create time：2020-03-02
    Update time：
-->
<template>
  <el-form
    :model="form"
    ref="form"
    :rules="rule"
    :hide-required-asterisk="true"
    label-position="top"
  >
    <div class="sacle-box" v-if="tabIndex == 0">
      <div class="sacle-item">
        <el-image src="http://www.taoledou.cn/public/mobile/images/kao1.png" />
      </div>
    </div>
    <el-row v-if="tabIndex == 0">
      <el-col>
        <el-form-item label="套餐选择" prop="regin">
          <el-select v-model="form.region" placeholder="请选择套餐" @change="getImage">
            <el-option label="精英版" value="jy"></el-option>
            <el-option label="豪华版" value="hh"></el-option>
            <el-option label="至尊版" value="zg"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="tabIndex == 2">
      <el-col>
        <el-image
          :src="'http://www.taoledou.cn/public/home/static/he/'+this.form.region+tabIndex+'.jpg'"
        />
      </el-col>
      <el-col>
        <el-form-item label="手写签名" prop="sign">
          <comSignCanvas ref="sign" v-model="form.sign" v-if="tabIndex" />
        </el-form-item>
        <el-form-item label="淘宝账号" prop="taobao">
          <el-input v-model="form.taobao" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="tabIndex == 3">
      <el-col>
        <el-image
          :src="'http://www.taoledou.cn/public/home/static/he/'+this.form.region+tabIndex+'.jpg'"
        />
      </el-col>
      <el-col>
        <el-form-item label="确认联系电话" prop="checkMobile">
          <el-input v-model="form.checkMobile" @blur="vaMobile" type="tel" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系邮箱" prop="email">
          <el-input v-model="form.email" type="email" autocomplete="off"></el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row v-if="tabIndex == 1 ||  (tabIndex >= 4 && tabIndex <=8) || tabIndex == 10">
      <el-col>
        <el-image
          :src="'http://www.taoledou.cn/public/home/static/he/'+this.form.region+tabIndex+'.jpg'"
        />
      </el-col>
    </el-row>
    <el-row v-if="tabIndex == 9">
      <el-col>
        <el-image
          :src="'http://www.taoledou.cn/public/home/static/he/'+this.form.region+tabIndex+'.jpg'"
        />
      </el-col>
      <el-col>
        <el-form-item label="手写签名" prop="sign1">
          <comSignCanvas ref="sign" v-model="form.sign1" v-if="tabIndex" />
        </el-form-item>
        <el-form-item label="身份证号码" prop="userId">
          <el-input v-model="form.userId" maxlength="18" minlength="18" autocomplete="off"></el-input>
          <el-checkbox v-model="checked">已阅读并同意本协议</el-checkbox>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row>
      <el-col style="display:flex;justify-content:center">
        <el-button @click.stop="prev" v-if="tabIndex>0">上一步</el-button>
        <el-button
          type="primary"
          @click.stop="$refs['sign'].toClear"
          v-if="tabIndex == 2"
          :disabled="!form.sign"
        >重写</el-button>
        <el-button
          type="primary"
          @click.stop="$refs['sign'].toClear"
          v-if="tabIndex == 9"
          :disabled="!form.sign1"
        >重写</el-button>
        <el-button type="primary" @click.stop="onSave" v-if="tabIndex==10">确定提交</el-button>
        <el-button
          type="primary"
          @click.stop="next"
          v-if="tabIndex<10"
          :disabled="!checked && tabIndex == 9"
        >下一步</el-button>
      </el-col>
    </el-row>
  </el-form>
</template>
<script>
export default {
  components: {
    comSignCanvas: () => import("@/components/comSignCanvas")
  },
  data() {
    return {
      checked: false,
      img: [],
      form: {
        uid: this.fnStorage.getStore("user").id,
        region: "zg", //套餐
        mobile: null, //手机号
        name: null, //姓名
        taobao: null, //淘宝账号
        userId: null, //身份证
        email: null, //邮箱
        sign: null, // 手写签名
        sign1: null, // 手写签名
        checkMobile: null //确认联系电话
      },
      arr: {
        elite: [],
        luxury: [],
        supreme: []
      },
      rule: {
        sign: {
          required: true,
          message: "必填项"
        },
        sign1: {
          required: true,
          message: "必填项"
        }
      },
      tabIndex: 0
    };
  },
  created() {
    this.getImage(this.form.region);
  },
  methods: {
    next() {
      this.tabIndex += 1;
    },
    prev() {
      this.tabIndex -= 1;
    },
    getImage(a, i = 0) {
      while (i < 10) {
        i++;
        let img = document.createElement("img");
        img.src = `http://www.taoledou.cn/public/home/static/he/${a}${i}.jpg`;
      }
    },
    vaMobile() {
      if (this.form.mobile == this.form.checkMobile) return;
      this.$alert("手机号码有误");
    },
    async onSave() {
      if (!this.form.sign1 || !this.form.sign) {
        this.$message.error("请在签名处，完成手写签名");
        return;
      }
      let formData = new FormData();
      for (let k in this.form) {
        if (this.form[k]) formData.append(k, this.form[k]);
      }
      // console.log(this.form);
      let { data } = await this.fnAxios("/homes/Personal/membr_sign", {
        method: "post",
        data: formData
      });
      if (data.code) {
        let userInfo = this.fnStorage.getStore("user");
        userInfo.status = 1;
        this.fnStorage.setStore("user", userInfo);
        this.$store.commit("setUser", userInfo);
        this.$message.success(data.msg);
        this.$router.push("/user");
      }
    }
  }
};
</script>
<style lang='less' scoped>
.el-button {
  width: 100%;
  margin: 20px;
}
</style>