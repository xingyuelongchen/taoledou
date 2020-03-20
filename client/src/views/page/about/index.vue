<template>
  <div>
    <el-row class="about">
      <el-col :span="24" class="scale-box">
        <!-- 轮播图 -->
        <div class="scale-item">
          <el-carousel :interval="5000" arrow="never" height="100%">
            <el-carousel-item v-for="item in carousel" :key="item.href" :label="item.alt">
              <el-image :src="item.href" fit="contain"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <div class="container">
      <el-row>
        <el-col class="button">
          <div @click="tab(0)" :class="{'active':isShowIndex == 0}">公司简介</div>
          <div @click="tab(1)" :class="{'active':isShowIndex == 1}">荣誉资质</div>
          <div @click="tab(2)" :class="{'active':isShowIndex == 2}">联系我们</div>
          <div @click="tab(3)" :class="{'active':isShowIndex == 3}">投诉建议</div>
        </el-col>
        <el-col :xs="{span:22,offset:1}">
          <!-- 公司信息 -->
          <div v-if="isShowIndex == 0">
            <el-image src="https://www.taoledou.cn/public/home/static/img/banhen.png" />
            <div class="about-info">
              <div class="image hidden-xs-only">
                <img src="http://www.taoledou.cn/public/home/static/img/us_img1.jpg" />
              </div>
              <div>
                <p style="font-size: 34px;margin-bottom:20px;">关于淘乐逗</p>
                <p
                  style="font-size: 16px;margin-bottom:20px;line-height: 38px; "
                >公司拥有一支有多年电商服务资深经验的管理团队和专业的服务团队，凭借多年积累的电商行业实践经验，致力于解决电商中小卖家的需求，为电商中小卖家提供多项服务技术支撑，包含有网店培训、网店工具、网店服务、企业服务、货源分销、电商直播、短视频拍摄七大服务板块，为电商中小卖家提供一站式，系统化的服务方案。</p>
                <p style="font-size: 16px;line-height: 38px; ">口号：淘乐逗，您身边的电商专家；</p>
                <p style="font-size: 16px;line-height: 38px; ">使命：让电商创业更简单；</p>
                <p
                  style="font-size: 16px;margin-bottom:20px;line-height: 38px; "
                >愿景：成为电商培训、就业、创业、孵化领域的领导者，让电商产业发展惠及更多人；</p>
                <p
                  style="font-size: 16px;margin-bottom:20px;line-height: 38px;"
                >我们不断倾听和满足用户需求，引导并超越用户需求，用技术+服务的方式让企业与用户更加紧密的联系在一起，让互联网+更简单；用一切以满足用户需求为导向的服务理念来打造电商创业更简单；关注不同领域，不同地域，不同群体，并针对不同对象提供多元化，差异化的产品和服务。</p>
              </div>
            </div>
          </div>
          <!-- 荣誉资质 -->
          <div v-if="isShowIndex == 1" class="honor">
            <div class="title">
              <h3>荣誉资质</h3>
              <p>创业开网店就要认准大品牌、有实力、有保障、让您后顾无忧</p>
            </div>
            <div class="img">
              <template v-for="(item,index) in honor">
                <el-image :preview-src-list="imgList" :key="index" :src="item.href" />
              </template>
            </div>
          </div>
          <!-- 联系方式 -->
          <div v-if="isShowIndex == 2" class="contacts">
            <el-row>
              <el-col :xs="24" :sm="12" v-for="(item,index) in contact" :key="index" class="info">
                <span>{{item.name}}：{{item.content}}</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <baidu-map class="bm-view" :center="map.center" :zoom="map.zoom">
                  <bm-marker :position="map.center" :dragging="true" @click="infoWindow(true)">
                    <bm-info-window :show="map.show" @close="infoWindow" @open="infoWindow(true)">
                      <div>淘乐逗网络科技有限公司</div>
                      <div>地址：成都市高新区吉瑞三路99号</div>
                    </bm-info-window>
                  </bm-marker>
                </baidu-map>
              </el-col>
            </el-row>
          </div>
          <!-- 投诉建议 -->
          <div v-if="isShowIndex == 3">
            <div class="complaint">
              <el-form ref="form" :model="form" label-width="100px">
                <div class="input">
                  <el-form-item label="表单标题：" prop="title">
                    <el-input v-model="form.title"></el-input>
                  </el-form-item>
                  <el-form-item label="联系方式：" prop="phone">
                    <el-input v-model="form.phone"></el-input>
                  </el-form-item>
                  <el-form-item label="表单类别：" prop="type">
                    <el-checkbox-group v-model="form.types">
                      <el-checkbox label="开店" value="开店"></el-checkbox>
                      <el-checkbox label="货源" value="货源"></el-checkbox>
                      <el-checkbox label="装修" value="装修"></el-checkbox>
                      <el-checkbox label="推广" value="推广"></el-checkbox>
                      <el-checkbox label="其它" value="其它"></el-checkbox>
                    </el-checkbox-group>
                  </el-form-item>
                  <!-- <el-form-item label="表单类别：" prop="type">
                <el-select v-model="form.type">
                  <el-option label="建议" value="建议"></el-option>
                  <el-option label="投诉" value="投诉"></el-option>
                </el-select>
                  </el-form-item>-->
                </div>
                <el-form-item label="主题内容：" class="textarea" prop="content">
                  <el-input type="textarea" v-model="form.content" resize="none" :rows="5" />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">立即创建</el-button>
                  <el-button @click="onReset">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      map: {
        center: { lng: 104.071578, lat: 30.560665 },
        zoom: 17,
        show: true
      },
      isShowIndex: 0,
      form: { title: "", types: [], content: "", montent: "" },
      contact: [
        { name: "服务时间", content: "09:00 - 24:00" },
        { name: "投诉电话", content: "400-0916-089转0" },
        { name: "官方电话", content: "400-0916-089" },
        { name: "投诉邮箱", content: "tousu@taoledou.cn" },
        { name: "办公地址", content: "成都市高新区吉瑞三路99号" }
      ],
      carousel: [
        {
          href: "http://www.taoledou.cn/public/home/static/img/about.png",
          alt: ""
        }
      ],
      // 荣誉资质
      honor: [
        {
          href: "http://www.taoledou.cn/public/home/static/img/z1.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z2.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z3.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z4.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z5.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z6.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z7.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z8.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z9.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z10.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z11.jpg",
          alt: ""
        },
        {
          href: "http://www.taoledou.cn/public/home/static/img/z12.png",
          alt: ""
        }
      ]
    };
  },
  computed: {
    imgList() {
      return this.honor.map(k => k.href);
    }
  },
  created() {
    this.isShowIndex = this.$route.params.id || 0;
    this.isShowIndex == ":id" && (this.isShowIndex = 0);
  },
  methods: {
    infoWindow(bool) {
      this.map.show = bool === true;
    },
    tab(i) {
      this.isShowIndex = i;
    },
    onReset() {
      this.form.types = [];
      this.$refs["form"].resetFields();
    },
    async onSubmit() {
      let form = { ...this.form, types: this.form.types.join(",") };
      let { data } = await this.fnAxios("/homes/Complaint/add", {
        method: "post",
        params: form
      });
      this.$message.success(data.msg);
      if (data.code) {
        this.onReset();
        this.form.types = [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.line-hidden(@num) {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: @num;
  overflow: hidden;
}
.title {
  text-align: center;

  h3 {
    font-size: 36px;
    margin: 0;
  }
  p {
    font-size: 20px;
  }
}
.container {
  margin-bottom: 60px;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  > div {
    width: 160px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin: 0 20px;
    &:hover,
    &.active {
      color: #f52;
      border-color: #f52;
      cursor: pointer;
    }
  }
  @media screen and (max-width: 992px) {
    height: 100px;
    > div {
      width: 120px;
      height: 40px;
      line-height: 40px;
      margin: 0 10px;
    }
  }
}
.about {
  margin-bottom: 50px;
}
.about-info {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .image {
    flex: 4;
    margin-right: 40px;
    text-align: center;
    img {
      max-width: 100%;
    }
  }
  > div {
    flex: 7;
    p {
      margin: 0;
      padding: 0;
    }
  }
}
.honor {
  .img {
    border: 1px solid #ccc;
    border-top: 3px solid #f52;
    margin-top: 90px;
    overflow: hidden;
    display: grid;
    grid-template-columns: 24% 1fr 1fr 1fr;
    grid-gap: 10px 1%;
    padding: 20px;
  }
}

.contacts {
  border: 1px solid #ccc;
  border-top: 3px solid #f52;
  padding: 20px;
  .bm-view {
    width: 100%;
    height: 300px;
  }
  .info {
    span {
      line-height: 60px;
      height: 60px;
      font-size: 18px;
      @media screen and (max-width: 768px) {
        line-height: 40px;
        height: 40px;
        font-size: 16px;
      }
    }
  }
}
.complaint {
  border: 1px solid #ccc;
  border-top: 3px solid #f52;
  padding: 20px;
  .el-input {
    max-width: 318px;
  }
  // .el-checkbox-group {
  //   max-width: 500px;
  // }
  .textarea {
    @media screen and (min-width: 768px) {
      max-width: 70%;
    }
  }
}
</style>