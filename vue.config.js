const { defineConfig } = require("@vue/cli-service");
let i18nPlugin = require("./plugin");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.plugin("i18n").use(i18nPlugin).after("vue-loader");
    // config.module.rule("vue").use("vue-loader").loader("vue-loader").loader(path.resolve(__dirname, "./loader.js"));
    // .tap((option) => {
    //   // option.postLoaders = {
    //   //   html: path.resolve(__dirname, "./loader.js"),
    //   //   js: path.resolve(__dirname, "./loader.js"),
    //   // };
    //   return option;
    // });
    // .merge({
    //   resourceQuery: function (query) {
    //     // console.log(query);
    //     return false;
    //   },
    //   loader: "./loader.js",
    // });
  },
});
