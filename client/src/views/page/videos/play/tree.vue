<!--
    Name：   列表展示
    Author： 
    Create time：2020-03-06
    Update time：
-->
<template>
  <ul class="tree">
    <template v-for="(item,index) in list">
      <li :key="index" class="box">
        <div
          class="item"
          :class="{title:item.child,active:item.show}"
          @click.prevent.stop="toogle(item)"
        >
          <span @click="event(item)">{{item.title}}</span>
          <i
            :class="{'el-icon-plus':item.child && !item.show,'el-icon-minus':item.child && item.show}"
          ></i>
        </div>
        <!-- <transition name="el-zoom-in-top"> -->
        <el-collapse-transition>
          <tree class="transition-box" :videoList="item.child" v-show="item.show" :event="event" />
        </el-collapse-transition>
        <!-- </transition> -->
      </li>
    </template>
  </ul>
</template>
<script>
export default {
  name: "tree",
  props: {
    videoList: {
      type: Array,
      default: () => []
    },
    event: {
      type: Function,
      default() {}
    }
  },
  data() {
    return {
      list: []
    };
  },
  watch: {
    videoList() {
      this.reData();
    }
  },
  created() {
    if (this.videoList.length) this.reData();
  },
  methods: {
    reData() {
      this.list = this.videoList.map(k => {
        return Object.assign(k, { show: false });
      });
    },
    toogle(item) {
      this.list = this.list.map(k => {
        if (k.id == item.id) k.show = !k.show;
        return k;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.box {
  .box {
    margin-left: 20px;
  }
  .item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    span {
      display: block;
      min-width: 90px;
      cursor: pointer;
      flex: 1;
      transition: all 0.2s;
      &:hover {
        transition: all 0.2s;
        color: #f52;
      }
    }
    &.title {
      //   transition: all 0.2s;
      cursor: pointer;
      background: #f1f1f1;
      padding: 0 20px;
      margin: 20px 0;
      &:hover,
      &.active {
        transition: all 0.2s;
        background: rgba(255, 150, 20, 1);
        color: #fff;
        span {
          color: #fff;
        }
      }
    }
  }
}
</style>