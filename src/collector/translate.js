const utils = require("./utils");
const XLSX = require("xlsx");
const path = require("path");
const ora = require("ora");
const myOra = ora();
const fs = require("fs");
/**
 *
 * @param options
 * @param oldKeysMap
 */
module.exports = function translate(options, oldKeysMap) {
  let tranKeys = Object.keys(options.translation || {});
  if (tranKeys && tranKeys.length) {
    tranKeys.forEach((tranKey) => {
      let sourceFiles = options.translation[tranKey] || [];
      if (sourceFiles && typeof sourceFiles === "string") {
        sourceFiles = [sourceFiles];
      }
      let translateObj = {};

      (sourceFiles || []).forEach((path) => {
        try {
          if (/\.js$/.test(path)) {
            let localObj = require(path);
            Object.assign(translateObj, localObj);
          } else {
            let workbook = XLSX.readFile(path);
            workbook.SheetNames.forEach((name) => {
              let sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[name]);
              let tempObj = {};
              sheetData.forEach((item) => {
                tempObj[item.key] = String(item.text || "").replace(/(<\/?)\s*([a-zA-z])+\s*(>)/g, "$1$2$3"); //移除标签空格
              });
              Object.assign(translateObj, tempObj);
            });
          }
        } catch (e) {
          myOra.fail(e.message);
        }
      });

      let localeResult = {};
      let xlsxData = [];
      let jsonData = {};

      Object.keys(oldKeysMap).map((key, index) => {
        if (translateObj[key]) {
          localeResult[key] = translateObj[key];
        } else {
          xlsxData.push({
            key: key,
            cn: oldKeysMap[key],
            text: "",
          });
          jsonData[key] = oldKeysMap[key];
        }
      });
      let outputJsPath = path.resolve(options.i18nDir, "./" + tranKey + "/index.js");
      let oldLocaleResult;
      if (fs.existsSync(outputJsPath)) {
        oldLocaleResult = require(outputJsPath);
      }
      if (!oldLocaleResult || JSON.stringify(oldLocaleResult) !== JSON.stringify(localeResult)) {
        let localeCode = "module.exports = " + JSON.stringify(localeResult);
        utils.writeFile(outputJsPath, localeCode);
      }

      let outputXlsxPath = path.resolve(options.i18nDir, "./" + tranKey + "/待翻译.xlsx");
      if (xlsxData.length) {
        let buf = utils.genXLSXData(xlsxData);
        utils.writeFile(outputXlsxPath, buf);
        utils.setUndoCount(tranKey, xlsxData.length);
      } else {
        utils.deleteFile(outputXlsxPath);
      }
    });
  }
};
