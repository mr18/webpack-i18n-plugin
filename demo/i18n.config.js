// const plugin = require("../src");
const path = require("path");
module.exports = {
  // _test: true,
  excluded: /node_modules|locale/, //排除文件选项（默认为：/node_modules/）

  src: path.resolve(__dirname, "./src"), //源文件目录（必选）

  outputPath: path.resolve(__dirname, "./locale"), //国际化配置输出目录（必选）

  babelrc: true,
  // 生成本地化语言包（可选）
  translation: {
    // en_US 语言包目录
    en_US: {
      source: [
        // path.resolve(__dirname, "./locale/en_US/翻译文件.xlsx"), //翻译文件excel
        // path.resolve(__dirname, "./locale/en_US/en.js"), //翻译文件excel
        /*,'...'*/
      ],
    },
  },
};
