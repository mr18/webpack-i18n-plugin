const babel = require("@babel/core");
const plugin = require("./plugin");
const utils = require("./utils");
module.exports = function (source) {
  if (utils.isChinese(source)) {
    try {
      let result = babel.transformSync(source, {
        filename: utils.genUuidKey(this.resourcePath) + ".js",
        plugins: [plugin],
      });
      // console.log("\n----------------------------------------------------------------------------------------");
      // console.log(source);
      // console.log("\n=========================================================================================");
      // console.log(result.code);
      // console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      return result.code;
    } catch (e) {
      console.error(e);
    }
  }
  return source;
};
