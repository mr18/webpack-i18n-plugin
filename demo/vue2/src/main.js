import Vue from "vue";
import App from "./App.vue";

// 语言包要确保是最先加载
// import en_US from "../i18n/en_US/locale";
// window.$i8n.locale(en_US); //设置当前语言包

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
