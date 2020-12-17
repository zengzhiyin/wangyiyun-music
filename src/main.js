import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import '@/style/index.scss'
import global from './utils/global'




import store from "./store";

Vue.config.productionTip = false;
Vue.use(global)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
