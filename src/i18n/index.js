const babel = require("@babel/core");
const fileUtils = require("./fs-utils");
const genUtils = require("./gen-utils");
const plugin = require("../plugin");
const loaderUtils = require("i18n-webpack-loader").utils;
const XLSX = require("xlsx");
const path = require("path");
const babelrc = require("./babelrc");
const ora = require("ora");
const fs = require("fs");
const myOra = ora();
const gen = require("./gen");

/**
 *
 * @param opt
 */
function genConfigFile(opt) {
  myOra.info("国际化配置生成中");
  let options = opt;
  console.log(options);
  let keysMap = loaderUtils.getKeysMap(),
    oldKeysMap = {},
    hasLocalFlie = false;
  let localeFilePath = path.resolve(options.outputPath, "./zh_CN/locale.js");
  if (fs.existsSync(localeFilePath)) {
    hasLocalFlie = true;
    oldKeysMap = require(localeFilePath);
  }
  let oldKeysMapKeys = Object.keys(oldKeysMap);
  let textKeyArr = [],
    newTextKeyArr = [],
    sortKeysMap = {};
  Object.keys(keysMap).map((key) => {
    if (oldKeysMapKeys.length && !oldKeysMap[key]) {
      newTextKeyArr.push(key);
    } else {
      textKeyArr.push(key);
    }
  });
  if (oldKeysMapKeys.length) {
    textKeyArr.sort((a, b) => {
      return oldKeysMapKeys.indexOf(a) - oldKeysMapKeys.indexOf(b);
    });
  }
  let allTextKey = textKeyArr.concat(newTextKeyArr);

  let textArr = [];
  let xlsxData = allTextKey.map((key) => {
    textArr.push(keysMap[key]);
    sortKeysMap[key] = keysMap[key];
    return {
      key,
      text: keysMap[key],
    };
  });

  let version = loaderUtils.genUuidKey(JSON.stringify(keysMap), "v_");
  let i18nPolyfillCode = genUtils.genPolyfill(version);
  fileUtils.writeFile(path.resolve(options.outputPath, "./localePolyfill.js"), i18nPolyfillCode);

  let i18nPolyfillTsCode = genUtils.genPolyfillTs();
  fileUtils.writeFile(path.resolve(options.outputPath, "./localePolyfill.d.ts"), i18nPolyfillTsCode);

  myOra.succeed("localePolyfill.js 生成完毕");

  let localeCode = "module.exports = " + JSON.stringify(sortKeysMap);
  fileUtils.writeFile(path.resolve(options.outputPath, "./zh_CN/locale.js"), localeCode);

  let buf = genUtils.genXLSXData(xlsxData);
  fileUtils.writeFile(path.resolve(options.outputPath, "./zh_CN/国际化语言包.xlsx"), buf);

  myOra.succeed("zh_CN 语言包文件生成成功");

  gen.genTranslateFile(options, hasLocalFlie ? oldKeysMap : sortKeysMap);

  myOra.succeed("国际化配置及语言包文件生成完毕");
}

/**
 *
 * @type {genConfigFile}
 */
module.exports = genConfigFile;
