const fileUtils = require("./fs-utils");
const path = require("path");
const XLSX = require("xlsx");
/**
 *
 * @param version
 * @returns {string|*|XML|void}
 */
const genPolyfill = function (version) {
  return fileUtils.readCodeText(path.resolve(__dirname, "./tplCode/polyfill.js")).replace("${version}", version);
};

/**
 *
 * @param version
 * @returns {string|*|XML|void}
 */
const genPolyfillTs = function () {
  return fileUtils.readCodeText(path.resolve(__dirname, "./tplCode/polyfill.d.ts"));
};

/**
 *
 * @param data
 * @returns {Number|*}
 */
function genXLSXData(data) {
  let ws = XLSX.utils.json_to_sheet(data);
  let wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet");
  return XLSX.write(wb, { type: "buffer", bookType: "xlsx" });
}

/**
 *
 * @type {{genPolyfill: genPolyfill, genXLSXData: genXLSXData}}
 */
module.exports = {
  genPolyfill: genPolyfill,
  genXLSXData: genXLSXData,
  genPolyfillTs: genPolyfillTs,
};
