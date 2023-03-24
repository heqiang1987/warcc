import App from './App'
import Api from './core/apiUrl.js'
import request from './core/request.js'
import request2 from './core/request2.js'
// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Vue3CountryIntl from 'vue3-country-intl';
import 'vue3-country-intl/lib/vue3-country-intl.css'

console.log(22,Vue3CountryIntl);

export function createApp() {
  const app = createSSRApp(App)
  app.component(Vue3CountryIntl.name, Vue3CountryIntl);
  app.config.globalProperties.$api = Api;
  app.config.globalProperties.$request = request;
  app.config.globalProperties.$request2 = request2;

  app.use(Antd)
  return {
    app
  }
}
// #endif