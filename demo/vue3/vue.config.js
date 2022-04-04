const { defineConfig } = require("@vue/cli-service");
let i18nPlugin = require("../../index");
let i18nConfig = require("./i18n.config");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config
      .plugin("i18n")
      .use(i18nPlugin)
      .after("vue-loader")
      .tap((options) => {
        return [...options, i18nConfig];
      });
  },
});
