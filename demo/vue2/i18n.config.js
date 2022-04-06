// const plugin = require("../src");
const path = require("path");
module.exports = {
  // i18nDir: path.resolve(__dirname, "./i18n"), //国际化配置输出目录

  translation: {
    //翻译文件excel
    en_US:[path.resolve(__dirname, "./i18n/en_US/翻译内容.xlsx")],
  },
};
