const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const WebpackI18nPlugin = require("webpack-i18n-plugin");
const WebpackI18nPlugin = require("../../../index");
const i18nConfig = require("./i18n.config");

let entry = {
  index: path.resolve(__dirname, "./src/index.js"),
  test: path.resolve(__dirname, "./src/test.tsx"),
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
      {
        test: /\.(j|t)sx?$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    // plugin 用于收集国际化信息
    new WebpackI18nPlugin(i18nConfig),

    new HtmlWebpackPlugin({
      title: "国际化",
      filename: "index.html",
      template: "./src/index.html",
    }),
  ],
};
