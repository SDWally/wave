import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import moment  from 'moment'
import Cookies from 'js-cookie'
import Element from 'element-ui'
import enLang from 'element-ui/lib/locale/lang/en'// 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖
import './icons' // icon

Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment
Vue.config.productionTip = false

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang // 如果使用中文，无需设置，请删除
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
