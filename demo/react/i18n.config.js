// const plugin = require("../src");
const path = require("path");
module.exports = {
  // 生成本地化语言包（可选）
  // i18nDir: path.resolve(__dirname, "./i18n"), //国际化配置输出目录（必选）

  translation: {
    // en_US 语言包目录
    en_US: {
      source: [
        // path.resolve(__dirname, "./locale/en_US/翻译文件.xlsx"), //翻译文件excel
        // path.resolve(__dirname, "./i18n/en_US/en.js"), //翻译文件excel
      ],
    },
  },
};
