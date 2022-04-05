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
  myOra.info("国际化配置生成中...");
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
  textKeyArr.concat(newTextKeyArr).forEach((key) => {
    sortKeysMap[key] = keysMap[key];
  });

  let localeCode = "module.exports = " + JSON.stringify(sortKeysMap);
  utils.writeFile(path.resolve(options.i18nDir, "./zh_CN/locale.js"), localeCode);

  translate(options, hasLocalFlie ? oldKeysMap : sortKeysMap);

  myOra.succeed("国际化配置生成完毕！\n");
}

/**
 *
 * @type {genConfigFile}
 */
module.exports = genConfigFile;
