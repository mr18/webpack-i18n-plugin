const utils = require("./utils");
const i18nUtils = require("../loader/utils");
const path = require("path");
const ora = require("ora");
const fs = require("fs");
const myOra = ora();
const translate = require("./translate");

/**
 *
 * @param options
 */
function genConfigFile(opt) {
  let options = {
    i18nDir: path.resolve(process.cwd(), "./i18n"),
    ...opt,
  };
  myOra.info("国际化配置生成中");
  let keysMap = i18nUtils.getKeysMap(),
    oldKeysMap = {},
    hasLocalFlie = false;
  let localeFilePath = path.resolve(options.i18nDir, "./zh_CN/locale.js");
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

  let version = i18nUtils.genUuidKey(JSON.stringify(keysMap), "v_");
  let i18nPolyfillCode = utils.genPolyfill(version);
  utils.writeFile(path.resolve(options.i18nDir, "./localePolyfill.js"), i18nPolyfillCode);

  let i18nPolyfillTsCode = utils.genPolyfillTs();
  utils.writeFile(path.resolve(options.i18nDir, "./localePolyfill.d.ts"), i18nPolyfillTsCode);

  myOra.succeed("localePolyfill.js 生成完毕");

  let localeCode = "module.exports = " + JSON.stringify(sortKeysMap);
  utils.writeFile(path.resolve(options.i18nDir, "./zh_CN/locale.js"), localeCode);

  let buf = utils.genXLSXData(xlsxData);
  utils.writeFile(path.resolve(options.i18nDir, "./zh_CN/国际化语言包.xlsx"), buf);

  myOra.succeed("zh_CN 语言包文件生成成功");

  translate(options, hasLocalFlie ? oldKeysMap : sortKeysMap);

  myOra.succeed("国际化配置及语言包文件生成完毕");
}

/**
 *
 * @type {genConfigFile}
 */
module.exports = genConfigFile;
