<!--
    Name：   订单管理
    Author： 
    Create time：2020-03-01
    Update time：
-->
<template>
  <div class="order container">
    <!-- 大屏 -->
    <div class="hidden-xs-only">
      <el-tabs v-model="activeName" tab-position="top" @tab-click="getData(1)">
        <template v-for="(item,index) in tabArr">
          <el-tab-pane :label="item.title" :name="item.name" :key="index">
            <comTable v-model="item.data" :fields="fields" :options="tableOptions" />
            <el-col style="text-align:center">
              <el-pagination
                class="hidden-xs-only"
                :current-page="page[activeName].currentIndex"
                layout="prev, pager, next"
                :page-size="page[activeName].size"
                :total="page[activeName].total"
                hide-on-single-page
                @current-change="onPage"
              ></el-pagination>
              <el-link class="hidden-sm-and-up" :underline="false" @click="tapPage">点击加载下一页</el-link>
            </el-col>
          </el-tab-pane>
        </template>
      </el-tabs>
    </div>
    <!-- 小屏 -->
    <el-row class="hidden-sm-and-up">
      <el-tabs v-model="activeName" tab-position="top" class="table">
        <template v-for="(item,index) in tabArr">
          <el-tab-pane :label="item.title" :name="item.name" :key="index">
            <el-collapse v-model="activenames">
              <template v-for="(k,i) in item.data">
                <el-collapse-item :name="i" :key="i">
                  <div slot="title" class="title">
                    <div>{{k.name}}</div>
                    <div>{{k.status?'已支付':'未支付'}}</div>
                    <div class="price">￥{{k.money}}</div>
                  </div>
                  <div class="order-content">
                    <div>
                      <span>订单号：</span>
                      {{k.order_on}}
                    </div>
                    <div>
                      <span>手机号：</span>
                      {{k.mobile}}
                    </div>
                    <div>
                      <span>支付方式：</span>
                      {{k.payment_type}}
                    </div>
                    <div>
                      <span>支付状态：</span>
                      {{k.status?'已支付':'未支付'}}
                    </div>
                    <div>
                      <span>创建时间：</span>
                      {{k.create_time}}
                    </div>
                  </div>
                </el-collapse-item>
              </template>
            </el-collapse>
          </el-tab-pane>
        </template>
      </el-tabs>
      <el-col style="text-align:center">
        <el-pagination
          class="hidden-xs-only"
          :current-page="page[activeName].currentIndex"
          layout="prev, pager, next"
          :page-size="page[activeName].size"
          :total="page[activeName].total"
          hide-on-single-page
          @current-change="onPage"
        ></el-pagination>
        <el-link
          class="hidden-sm-and-up"
          v-if="page[activeName].status"
          :underline="false"
          @click.stop="tapPage"
        >点击加载下一页</el-link>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  components: { comTable: () => import("@/components/comTable") },

  data() {
    return {
      tableData: [], //全部数据
      activeName: "all", // 分类
      activenames: null,
      tableOptions: {},
      page: {
        all: {
          total: 0,
          size: 10,
          currentIndex: 1,
          status: true
        },
        yes: {
          total: 0,
          size: 10,
          currentIndex: 1,
          status: true
        },
        no: {
          total: 0,
          size: 10,
          currentIndex: 1,
          status: true
        }
      },
      tabArr: [
        { title: "全部", name: "all" },
        { title: "已完成", name: "yes" },
        { title: "未完成", name: "no" }
      ],
      fields: [
        { prop: "order_on", label: "订单号" },
        { prop: "mobile", label: "手机号" },
        { prop: "money", label: "金额", formatter: a => "￥" + a },
        { prop: "name", label: "商品名称" },
        { prop: "payment_type", label: "支付方式" },
        {
          prop: "status",
          label: "支付状态",
          formatter: a => (a ? "已支付" : "未支付")
        },
        { prop: "create_time", label: "创建时间" }
      ]
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    async getData(page = 1, type = false) {
      let userInfo = this.fnStorage.getStore("user");
      let status = { all: null, yes: "1", no: "'0'" };
      let path = {
        mobile: userInfo.mobile,
        limit: this.page[this.activeName].size,
        status: status[this.activeName],
        page
      };

      let { data } = await this.fnAxios("/homes/Personal/index?", {
        params: path
      });
      if (data.code) {
        this.page[this.activeName].total = data.count;
        this.tabArr = this.tabArr.map(k => {
          if (k.name == this.activeName) {
            if (!type) {
              k.data = data.data;
            } else {
              k.data = k.data.concat(data.data);
            }
          }
          return k;
        });
        if (
          !data.data.length ||
          data.data.length < this.page[this.activeName].size
        ) {
          this.page[this.activeName].status = false;
          return;
        }
      }
    },
    tapPage() {
      // 小屏加载
      this.page[this.activeName].currentIndex += 1;
      this.getData(this.page[this.activeName].currentIndex, true);
    },
    onPage(i = 1) {
      // 大屏加载
      this.page[this.activeName].currentIndex = i;
      this.getData(i);
    }
  }
};
</script>
<style lang='less' scoped>
.order {
  // padding: 30px 0;
  .table {
    // border: 1px solid #eee;
    // margin:0 -15px;
    /deep/ .el-tabs__header {
      margin: 0;
    }
  }
  .title {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    > div {
      flex: 1;
      &:first-child {
        flex: 5;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      }
    }
  }
  .price {
    color: #e33;
    font-weight: bold;
  }
  .order-content {
    > div {
      > span {
        display: inline-block;
        width: 80px;
      }
    }
  }
}
</style>