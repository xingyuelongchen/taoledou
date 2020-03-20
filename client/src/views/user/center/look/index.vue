<!--
    Name：   查看合同
    Author： 
    Create time：2020-03-02
    Update time：
-->
<template>
  <div>
    <template v-for="(item,index) in arr">
      <el-image :key="index" :src="item" :preview-src-list="arr"></el-image>
    </template>
  </div>
</template>
<script>
export default {
  data() {
    return {
      arr: []
    };
  },
  async created() {
    // http://www.taoledou.cn/homes/Personal/shows
    let { data } = await this.fnAxios(
      "/homes/Personal/shows?uid=" + this.fnStorage.getStore("user").id
    );
    if (data.code) this.arr = data.data;
  }
};
</script>
<style lang='less' scoped>
</style>