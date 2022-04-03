const path = require("path");
const webpackConfig = require("./webpack.config.js");

module.exports = {
  ...webpackConfig,
  devServer: {
    static: {
      directory: path.join(__dirname, ""),
    },
    compress: true,
    port: 9000,
    client: {
      logging: "error",
    },
  },
};
