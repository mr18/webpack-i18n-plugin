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
    config
      .plugin("i18n")
      .use(i18nPlugin)
      .tap((options) => {
        return [...options, i18nConfig];
      });
  },
};
