const { defineConfig } = require("@vue/cli-service");
// const WebpackI18nPlugin = require("webpack-i18n-plugin");
const WebpackI18nPlugin = require("../../index");
let i18nConfig = require("./i18n.config");

module.exports = defineConfig({
  transpileDependencies: true,
  parallel: 0,
  chainWebpack: (config) => {
    config
      .plugin("i18n")
      .use(WebpackI18nPlugin)
      .tap((options) => {
        return [...options, i18nConfig];
      });
  },
});
