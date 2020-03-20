import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/theme/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import vueMeta from 'vue-meta'
import BaiduMap from 'vue-baidu-map'
import config from '@/config'
import VueVideoPlayer from 'vue-video-player'
import 'video.js/dist/video-js.css'

import plugins from '@/plugins'
import formatDate from '@/plugins/_FormatDate'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper)
Vue.use(plugins)
Vue.use(VueVideoPlayer)
Vue.use(BaiduMap, {
  ak: config.baiduMapKey
})
Vue.use(vueMeta)
Vue.use(elementUI)
Vue.config.productionTip = true
Vue.filter('filtersHtml', function (value) {
  let div = document.createElement('div');
  div.innerHTML = value;
  return div.innerText;

});
Vue.filter('time', function (value) {
  // return processed value
  return formatDate(value * 1000, 'YYYY-MM-DD')
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
