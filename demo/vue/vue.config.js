const { defineConfig } = require("@vue/cli-service");
let i18nPlugin = require("../../index");
const i18nConfig = require("./i18n.config");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin("i18n")
      .after("vue-loader")
      .use(i18nPlugin)
      .tap((options) => {
        return [i18nConfig];
      });
  },
});
