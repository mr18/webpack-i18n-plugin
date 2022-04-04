const { defineConfig } = require("@vue/cli-service");
let i18nPlugin = require("../../../index");
// const i18nPlugin = require("webpack-i18n-plugin");
let i18nConfig = require("./i18n.config");

module.exports = {
  configureWebpack: {
    resolveLoader: {
      modules: ["node_modules"],
    },
  },
  chainWebpack: (config) => {
    // config.module
    //   .rule("i18n")
    //   .test(/\.(t|j)sx?$/)
    //   .use("i18n-webpack-loader")
    //   // .loader(require.resolve("../../../../i18n-webpack-loader"));
    //   // .loader(require.resolve("../../../src/i18n-loader"));
    //   .loader("i18n-webpack-loader");
    //
    //
    //
    //
    // config
    //   .plugin("i18n")
    //   .use(i18nPlugin)
    //   .tap((options) => {
    //     return [...options, i18nConfig];
    //   });
  },
};
