const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const i18nPlugin = require("webpack-i18n-plugin");
const i18nPlugin = require("../../../index");
const i18nConfig = require("./i18n.config");

let entry = {
  index: path.resolve(__dirname, "./src/index.js"),
  xxx: path.resolve(__dirname, "./src/index.js"),
  asas: [path.resolve(__dirname, "./src/index.js"), path.resolve(__dirname, "./src/test.tsx")],
  sd3: path.resolve(__dirname, "./src/index.js"),
};
module.exports = {
  mode: "production",
  entry: Object.keys(entry).reduce((acc, cur) => {
    acc[cur] = [].concat(entry[cur]);
    return acc;
  }, {}),

  output: {
    path: path.resolve(__dirname, "./dist"),
    publicPath: "",
    filename: "[name].min.js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".tsx", ".ts"],
  },
  module: {
    rules: [
      // loader 用于编译国际化代码
      {
        test: /\.(j|t)sx?$/,
        // loader: "webpack-i18n-plugin/loader",
        loader: "../../../loader",
        exclude: /node_modules/,
      },
      // 注意loader顺序，babel-loader 需在 ts-loader 前面，否则会造成插件功能会被ts-loader覆盖
      {
        test: /(\.jsx|\.js|\.tsx|\.ts)$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },

      {
        test: /(\.tsx|\.jsx|\.ts)$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // plugin 用于收集国际化信息
    new i18nPlugin(i18nConfig),

    new HtmlWebpackPlugin({
      title: "国际化",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
