const { defineConfig } = require("@vue/cli-service");
let i18nPlugin = require("../../../index");
let i18nConfig = require("./i18n.config");

module.exports = {
  chainWebpack: (config) => {
    config
      .plugin("i18n")
      .use(i18nPlugin)
      .tap((options) => {
        return [...options, i18nConfig];
      });
    config.module
      .rule("i18n")
      .test(/\.(t|j)sx?$/)
      .use("i18n-loader")
      .loader(require.resolve("../../../../i18n-webpack-loader"));
  },
};
