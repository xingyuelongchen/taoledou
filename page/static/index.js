(function () {
    Vue.use(VueAwesomeSwiper);
    const options = {
        el: '#app',
        data: {
            show: false,
            friendship: [],
            form: { name: null, mobile: null, weixin: null, qq: null },
            swiperSide: ['./images/swiper_a.png', './images/swiper_b.png'],
            bandGoodes: [
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h1.png",
                    title: "万款产品任你挑"
                },
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h2.png",
                    title: "定时更新"
                },
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h3.png",
                    title: "一件代发"
                },
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h4.png",
                    title: "七天无理由"
                },
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h5.png",
                    title: "闪电发货"
                },
                {
                    pic: "http://www.taoledou.cn/public/home/static/img/h6.png",
                    title: "品牌货源"
                }
            ],
            bandServed: [
                {
                    color: "#90dfaa",
                    title: "品牌打造",
                    pic: "./images/icons/icon1.png",
                    doc: "多家品牌商合作，打造专属品牌"
                },
                {
                    color: "#93b4fc",
                    title: "辅助运营",
                    pic: "./images/icons/icon2.png",
                    doc: "金牌导师手把手教学，全程辅助运营，快速提升业绩"
                },
                {
                    color: "#c3d22f",
                    title: "活动申报",
                    pic: "./images/icons/icon3.png",
                    doc: "频台活动策划和申报创意H5活动海报提供"
                },
                {
                    color: "#80b740",
                    title: "店铺入住",
                    pic: "./images/icons/icon4.png",
                    doc: "高效入住各大平台，专业电商团队"
                },
                {
                    color: "#34c767",
                    title: "课程培训",
                    pic: "./images/icons/icon5.png",
                    doc: "体系化课程金牌讲师系统教学"
                },
                {
                    color: "#45a549",
                    title: "精选货源",
                    pic: "./images/icons/icon6.png",
                    doc: "多家精选货源商 签约合作 万款产品一件代发"
                },
                {
                    color: "#049de0",
                    title: "内容策划",
                    pic: "./images/icons/icon7.png",
                    doc: "资深策划团队 定制专属创意 视频内容"
                },
                {
                    color: "#008d80",
                    title: "数据分析",
                    pic: "./images/icons/icon8.png",
                    doc: "通过大数据解析 市场行情优化 店铺打造爆款"
                }
            ],
            swiperOption: {
                a: {
                    autoplay: {
                        delay: 4000
                    },
                    slidesPerView: 5,
                    spaceBetween: 10,
                    loop: false
                },
                b: {
                    autoplay: {
                        delay: 2500
                    },
                    slidesPerView: 5,
                    spaceBetween: 10,
                    loop: false
                }
            },
            swiper: {
                a: [
                    { pic: "http://www.taoledou.cn/public/home/static/img/z1.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z2.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z3.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z4.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z5.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z6.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z7.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z8.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z9.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z10.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z11.jpg" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/z12.png" }
                ],
                b: [
                    { pic: "http://www.taoledou.cn/public/home/static/img/jl.png" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/lj.png" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/lqs.png " },
                    { pic: "http://www.taoledou.cn/public/home/static/img/mq.png " },
                    { pic: "http://www.taoledou.cn/public/home/static/img/oy.png " },
                    { pic: "http://www.taoledou.cn/public/home/static/img/sg.png " },
                    { pic: "http://www.taoledou.cn/public/home/static/img/yx.png" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/zl.png" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/hbl.png" },
                    { pic: "http://www.taoledou.cn/public/home/static/img/hz.png " }
                ]
            }
        },
        async mounted() {
            let { data } = await axios("http://www.taoledou.cn/homes/index/index");
            this.friendship = data.findk || ['淘乐逗'];
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
        },
        methods: {
            async onSave() {
                let query = []
                for (let k in this.form) {
                    if (this.form[k]) query.push(`${k}=${this.form[k]}`);
                }
                if (!query.length) return;
                let { data } = await axios("http://www.taoledou.cn/homes/index/add?" + query.join('&'));
                if (data.code) {
                    confirm(data.msg)
                    this.form = {
                        name: null,
                        mobile: null,
                        weixin: null,
                        qq: null
                    };
                } else {
                    alert(data.msg)
                }

            }
        }
    }
    var Vm = new Vue(options)
})();
