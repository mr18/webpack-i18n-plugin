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
      return result.code;
    } catch (e) {
      // console.error(e);
    }
  }
  return source;
};
