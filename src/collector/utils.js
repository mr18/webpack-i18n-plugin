const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
/**
 *
 * @param filePath
 * @param list
 * @returns {*|Array}
 */
module.exports.getFileList = function (filePath, list) {
  list = list || [];
  let files = fs.readdirSync(filePath) || [];

  files.forEach(function (filename) {
    let fileDir = path.join(filePath, filename);
    let stats = fs.statSync(fileDir);

    if (stats.isFile()) {
      list.push(fileDir);
    } else if (stats.isDirectory()) {
      getFileList(fileDir, list);
    }
  });
  return list;
};

/**
 *
 * @param filePath
 */
const readCodeText = function (filePath) {
  let filePathStr = path.resolve(filePath);
  let text = fs.readFileSync(filePathStr, "utf-8");

  return text;
};
module.exports.readCodeText = readCodeText;
/**
 *
 * @param filePath
 * @param code
 */
module.exports.writeFile = (filePath, code) => {
  filePath = path.resolve(filePath);
  let dirname = path.dirname(filePath);
  let filePathArr = dirname.split(path.sep);

  /**
   *
   * @param index
   */
  function mkdir(index) {
    let pathArr = filePathArr.slice();
    pathArr.splice(index, filePathArr.length - 1);
    let dirPath = path.normalize(pathArr.join(path.sep));
    if (!fs.existsSync(dirPath) && !/\.[\w\d]+$/.test(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    if (filePathArr.length > 0 && index < filePathArr.length) {
      mkdir(++index);
    }
  }

  mkdir(1);

  fs.writeFileSync(filePath, code, "utf-8");
};
/**
 *
 * @param filePath
 */
module.exports.deleteFile = (filePath) => {
  if (Array.isArray(filePath)) {
    filePath.forEach((item) => {
      if (fs.existsSync(item)) {
        fs.unlinkSync(item);
      }
    });
  } else {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }
};

/**
 *
 * @param version
 * @returns {string|*|XML|void}
 */
module.exports.genPolyfill = function (version) {
  return readCodeText(path.resolve(__dirname, "./tplCode/polyfill.js")).replace("${version}", version);
};

/**
 *
 * @param version
 * @returns {string|*|XML|void}
 */
module.exports.genPolyfillTs = function () {
  return readCodeText(path.resolve(__dirname, "./tplCode/polyfill.d.ts"));
};

/**
 *
 * @param data
 * @returns {Number|*}
 */
module.exports.genXLSXData = function (data) {
  let ws = XLSX.utils.json_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
};
