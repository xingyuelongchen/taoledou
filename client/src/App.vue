<template>
  <div id="app" ref="app">
    <keep-alive>
      <router-view :friendship="friendship " />
    </keep-alive>
    <div v-html="tongji"></div>
  </div>
</template>
<script>
export default {
  metaInfo() {
    let title = this.$route.meta.title || " 淘乐逗 - 电商运营培训网!",
      keywords = this.$route.meta.keywords || " 淘乐逗 - 电商运营培训网!",
      description = this.$route.meta.description || " 淘乐逗 - 电商运营培训网!";
    return {
      title,
      titleTemplate: "%s - 淘乐逗 - 电商运营培训网!",
      htmlAttrs: {
        lang: "zh-cn",
        amp: true
      },
      meta: [
        {
          name: "keywords",
          content: keywords
        },
        {
          name: "description",
          content: description
        }
      ]
    };
  },
  data() {
    return {
      friendship: null,
      tongji: null
    };
  },
  async create() {},
  async mounted() {
    let { data } = await this.fnAxios("/homes/index/index");
    this.tongji = data.config.site_statis;
    this.fnStorage.setStore("friendship", data.findk);
    let head = document.querySelector("head");
    let link = document.createElement("link");
    link.setAttribute("ref", "shortcut icon");
    link.href = data.config.site_favicon;
    link.type = "image/x-icon";
    head.appendChild(link);

    let link1 = document.createElement("link");
    link1.setAttribute("ref", "icon");
    link1.href = data.config.site_favicon;
    link1.type = "image/x-icon";
    head.appendChild(link1);
  }
};
</script>

<style lang="less">
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  ul,
  li {
    padding: 0;
    list-style: none;
  }
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #444;
  min-height: 100%;
}
// 公用css
// banner等比缩放
.scale-box {
  width: 100%;
  height: 0px;
  padding-bottom: 21%;
  position: relative;
  .scale-item {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    .el-carousel {
      height: 100%;
    }
  }
}
.el-select {
  width: 100%;
}
.el-image {
  width: 100%;
}
.image-slot {
  display: flex;
  justify-items: center;
  align-content: center;
  align-items: center;
}
.container {
  margin: 0 auto;
  @media screen and (min-width: 768px) {
    width: 750px !important;
  }
  @media screen and (min-width: 992px) {
    width: 970px !important;
  }
  @media screen and (min-width: 1200px) {
    width: 1200px !important;
  }
  @media screen and (min-width: 1300px) {
    width: 1200px !important;
  }
}
.container-fuild {
  width: 100vw;
}
</style>
