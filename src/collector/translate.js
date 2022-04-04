const utils = require("./utils");
const XLSX = require("xlsx");
const path = require("path");
const ora = require("ora");
const fs = require("fs");
const myOra = ora();

/**
 *
 * @param options
 * @param oldKeysMap
 */
module.exports = function genTranslateFile(options, oldKeysMap) {
  let tranKeys = Object.keys(options.translation || {});
  if (tranKeys && tranKeys.length) {
    myOra.info("翻译文件生成中");

    tranKeys.forEach((key) => {
      let sourceFiles = options.translation[key].source;
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
      let localeCode = "module.exports = " + JSON.stringify(localeResult);
      let tranPath = path.resolve(options.outputPath, "./" + key + "/locale.js");
      utils.writeFile(tranPath, localeCode);

      myOra.succeed(key + " 语言包文件生成成功");

      let outputXlsxPath = path.resolve(options.outputPath, "./" + key + "/待翻译内容.xlsx");
      let outputJsonPath = path.resolve(options.outputPath, "./" + key + "/待翻译内容.json");
      if (xlsxData.length) {
        myOra.info(xlsxData.length + "条待翻译");

        let buf = utils.genXLSXData(xlsxData);
        utils.writeFile(outputXlsxPath, buf);
        utils.writeFile(outputJsonPath, JSON.stringify(jsonData));

        myOra.info("待翻译文件保存目录：");
        myOra.info(" > " + outputXlsxPath);
        myOra.info(" > " + outputJsonPath);
      } else {
        utils.deleteFile(outputXlsxPath);
        utils.deleteFile(outputJsonPath);
      }
    });
  }
};
