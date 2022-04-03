const fs = require("fs");
const path = require("path");

/**
 *
 * @param filePath
 * @param list
 * @returns {*|Array}
 */
function getFileList(filePath, list) {
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
}

/**
 *
 * @param filePath
 */
const readCodeText = (filePath) => {
  let filePathStr = path.resolve(filePath);
  let text = fs.readFileSync(filePathStr, "utf-8");

  return text;
};
/**
 *
 * @param filePath
 * @param code
 */
const writeFile = (filePath, code) => {
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
const deleteFile = (filePath) => {
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
 * @type {{getFileList: getFileList, readCodeText: (function(*=)), writeFile: (function(*=, *=)), deleteFile: (function(*=))}}
 */
module.exports = {
  getFileList: getFileList,
  readCodeText: readCodeText,
  writeFile: writeFile,
  deleteFile: deleteFile,
};
