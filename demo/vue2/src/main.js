import Vue from "vue";
import App from "./App.vue";

// 语言包要确保是最先加载
// import en_US from "../output/en_US/index";
// window.$i8n.locale(en_US); //设置当前语言包

// 以下可选
// Vue.prototype.$i8n = window.$i8n; // 注册全局方法，适配eslint
// Vue.prototype.$$i8n = window.$$i8n; // 注册全局方法，适配eslint

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
