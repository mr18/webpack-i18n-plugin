const babel = require('@babel/core');
const plugin = require('../babel-plugin');
const utils = require('../babel-plugin/utils');
module.exports = function (source) {
  if (utils.isChinese(source)) {
    try {
      let result = babel.transformSync(source, {
        configFile: false,
        plugins: [plugin],
      });
      return result.code;
    } catch (e) {}
  }
  return source;
};
