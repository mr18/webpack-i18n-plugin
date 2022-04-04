const { defineConfig } = require("@vue/cli-service");
// const i18nPlugin = require("webpack-i18n-plugin");
const i18nPlugin = require("../../index");
let i18nConfig = require("./i18n.config");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("i18n")
      .test(/\.(t|j)sx?$/)
      .use("i18n-webpack-loader")
      .loader(require.resolve("../../loader"));
    // //
    // //
    // //
    // //
    config
      .plugin("i18n")
      .use(i18nPlugin)
      .tap((options) => {
        return [...options, i18nConfig];
      });
  },
});
