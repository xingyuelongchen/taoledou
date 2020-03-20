<!--
    Name：   账户资料
    Author： 
    Create time：2020-03-01
    Update time：
-->
<template>
  <div>
    <el-form label-width="80px">
      <el-row class="avatar">
        <el-col :xs="{span:12,offset:6}" :sm="{span:4}" :md="{span:6}" :lg="5">
          <el-avatar :size="150" :src="user.pic" @click.native="changeAvatar"></el-avatar>
        </el-col>
        <el-col class="hidden-xs-only" :sm="{span:12}" :md="{span:4}">
          <el-link @click.native="changeAvatar" :underline="false">更换头像</el-link>
          <input type="file" ref="file" style="display:none" @change="onFile" />
        </el-col>
      </el-row>
      <el-form-item prop="name" label="昵称">
        <el-input v-model="form.name" />
      </el-form-item>
      <!-- <el-form-item prop="password" label="密码">
        <el-input v-model="form.password" />
      </el-form-item>
      <el-form-item prop="email" label="邮箱">
        <el-input v-model="form.email" />
      </el-form-item>-->
      <el-form-item>
        <el-button @click="onSave">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      user: this.fnStorage.getStore("user") || {},
      form: {
        name: null,
        password: null,
        email: null
      }
    };
  },
  methods: {
    async onSave() {
      let options = {
        id: this.fnStorage.getStore("user").id,
        name: this.form.name
      };
      let formData = new FormData();
      for (let k in options) {
        if (options[k]) formData.append(k, options[k]);
      }
      let { data } = await this.fnAxios("/homes/Personal/personal_data", {
        headers: { "Content-Type": "multipart/form-data" },
        method: "post",
        data: formData
      });
      if (data && data.code) {
        this.user = Object.assign({}, this.fnStorage.getStore("user"), {
          nickname: this.form.name
        });
        this.fnStorage.setStore("user", this.user);
        this.$store.commit("setUser", this.user);
      }
    },
    async onFile(event) {
      let file = event.target.files[0];
      let formData = new FormData();
      formData.append("file", file);
      let { data } = await this.fnAxios("/homes/Personal/uploads", {
        method: "post",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" }
      });
      if (data && data.code) {
        this.user = Object.assign({}, this.fnStorage.getStore("user"), {
          pic: data.id
        });
        this.fnStorage.setStore("user", this.user);
        this.$store.commit("setUser", this.user);
      }
    },
    changeAvatar() {
      this.$refs["file"].click();
    }
  }
};
</script>
<style lang='less' scoped>
.avatar {
  height: 150px;
  display: flex;
  align-items: center;
  margin: 30px 0 30px 30px;
}
</style>