<!--*
*  description: 基础表格
*  author: qinglong
*  create Date: 2019-12-24
*-->
 
<template>
  <div class="mix-table">
    <el-table
      ref="table"
      header-row-class-name="min-table"
      style="width: 100%"
      tooltip-effect="dark"
      :max-height="options.maxHeight || 'auto'"
      :show-overflow-tooltip="true"
      :row-key="options.children||''"
      :data="fieldsData"
      :fit="true"
      @selection-change="onSelectChange"
    >
      <template v-for="(item,index) in fields">
        <el-table-column
          v-if="['selection','expand','index'].indexOf(item.type)>=0? item.type : ''"
          :type="['selection','expand','index'].indexOf(item.type)>=0? item.type : ''"
          :key="'selection'+index"
          :align="item.align"
          :fixed="item.fixed || ''"
          :formatter="item.formatter || null"
          :min-width="item.minWidth || '10px'"
          :sortable="item.sortable || false"
          :width="item.width || ''"
        />
        <el-table-column
          v-else
          :key="index"
          :prop="item.prop"
          :align="item.align"
          :label="item.label"
          :fixed="item.fixed || 'right'"
          :min-width="item.minWidth ||'10px'"
          :formatter="item.formatter || null"
          :sort-method="item.sortMethod || null"
          :sortable="item.sortable || false"
          :show-overflow-tooltip="true"
          :width="item.width || ''"
        >
          <template slot-scope="scope">
            <template v-if="item.type == 'manage'">
              <el-link
                :underline="false"
                v-for="(v,i) in item.options"
                @click.native.prevent="onEvent(v,scope.$index,scope)"
                :type="v.style || 'text'"
                :key="i"
                size="small"
              >{{v.label}}</el-link>
            </template>
            <template v-else-if="item.type == 'tag'">
              <div class="mix-table-tag">
                <el-tag type="plain" v-for="(v,i) in scope.row[item.prop].split(',')" :key="i">{{v}}</el-tag>
              </div>
            </template>
            <template
              v-else
            >{{item.formatter?item.formatter(scope.row[item.prop]):scope.row[item.prop]}}</template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      background
      class="min-table-bottom"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="20"
      :page-count="total"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="onPage"
    ></el-pagination>
  </div>
</template>
<script>
export default {
  model: {
    prop: "fieldsData"
  },
  props: {
    options: {
      type: Object,
      default() {
        return {
          maxHeight: "auto",
          page: {
            url: null,
            prop: "data"
          }
        };
      }
    },
    fields: {
      type: Array,
      default() {}
    },
    fieldsData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      total: 0,
      pageIndex: 1, //当前页
      pageSize: 10 // 表格每页数据
    };
  },
  watch: {
    fieldsData: {
      deep: true,
      handler(data) {
        this.$emit("change", data);
        this.$emit("input", data);
      }
    }
  },
  created() {
    this.onPage();
  },
  methods: {
    onEvent(item, rowIndex, scope) {
      // 页面事件处理
      if (!item.event) return;
      if (typeof item.event === "string" && !!this.$parent[item.event]) {
        this.$parent[item.event](scope.row, rowIndex, scope);
      }
      if (typeof item.event === "function")
        item.event(scope.row, rowIndex, scope);
    },
    onSelectChange(selectionData) {
      // 复选框数据， 选中行，会添加 check:true,
      this.fieldsData.forEach(e => {
        if (selectionData.indexOf(e) >= 0) {
          e.check = true;
        } else {
          e.check = false;
        }
      });
    },
    handleSizeChange(i) {
      // 修改每页显示数量
      this.pageSize = i;
      this.onPage(this.pageIndex);
    },
    async onPage(i = 1) {
      this.pageIndex = i;
      // 传递了page参数，初始数据和点击分页会自动请求数据
      if (!!this.options.page && this.options.page.url) {
        let page = this.options.page;
        // 如果需要匹配搜索条件的分页，需要传递 search 参数
        if (!page.url) {
          console.error(`page内URL为必需参数:`, this.options.page);
          return;
        }
        let search = page.search || {};
        let options = {
          url: page.url || "未传递URL",
          method: page.method || "get",
          params: { page: i, size: this.pageSize, ...search }
        };
        // 获取当前页码的数据
        let { data, status } = await this.fnAxios(options);
        if (status == 200) {
          this.fieldsData = page.prop ? data[page.prop] : data;
          this.total = Math.ceil(data.count / 10);
        }
        return;
      }
      // 如果没传递page参数，则调用传递的事件方法
      let fn = this.options["event"];
      // 如果未传递事件方法，则不作任何操作
      if (!fn) return;
      if (typeof fn === "string") {
        this.$parent[fn](i, this.pageSize);
        return;
      }
      if (typeof fn === "function") {
        fn(i, this.pageSize);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.el-link {
  margin: 5px;
}
.mix-table {
  margin: 20px auto;
}
.mix-table-tag {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.el-tag {
  margin: 2px;
}
.min-table-top {
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  > * {
    margin-right: 10px;
  }
}
.min-table-bottom {
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>