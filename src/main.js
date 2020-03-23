import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'

import toast from 'components/common/toast'

Vue.config.productionTip = false

//解决移动端300s的延迟
FastClick.attach(document.body)

//安装toast插件
Vue.use(toast)

//安装懒加载插件
Vue.use(VueLazyload)

Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
