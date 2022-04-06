const path = require("path");
module.exports = {
  i18nDir: path.resolve(__dirname, "./output"), //国际化配置输出目录

  translation: {
    //翻译文件excel
    en_US: [path.resolve(__dirname, "./output/en_US/翻译内容.xlsx")],
    ja_JP: [path.resolve(__dirname, "./output/ja_JP/翻译内容.xlsx")],
  },
};
