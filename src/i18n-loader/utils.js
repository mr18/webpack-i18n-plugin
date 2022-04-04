const _opt = require("./options");
const ora = require("ora");
const myOra = ora();
/**
 *
 * @param value
 * @param prefixKey
 * @returns {string}
 */

module.exports.genUuidKey = function (value, prefixKey) {
  let valArr = (value || "").trim().split("");
  let code = 0;
  let total = 0;
  valArr.forEach((val, index) => {
    let v = val.charCodeAt();
    total += v;
    code += Math.log10(v) * (index + 1);
  });
  // key存在重复的可能，概率极小
  code *= 100000000;
  code += value.length + total;
  let uniqueKey = parseInt(code).toString(36);
  return (prefixKey || "") + uniqueKey;
};

/**
 *
 * @param val
 * @returns {boolean}
 */
module.exports.isChinese = function (val) {
  return /[\u4e00-\u9fa5]/.test(val);
};

/**
 *
 * @param key
 * @returns {string}
 */
module.exports.genPropertyKey = function (key) {
  return "$_" + (key || "");
};

/**
 *
 * @type {{}}
 */
let keysMap = {};

/**
 *
 * @param uuidKey
 * @param value
 */
module.exports.collectKeys = function (uuidKey, value) {
  value = (value || "").replace(/'/g, '"').trim();
  if (keysMap[uuidKey] && value && keysMap[uuidKey] !== value) {
    myOra.warn("存在重复的key：" + uuidKey + " ---> " + keysMap[uuidKey] + " ---> " + value);
    myOra.info('请给其中之一添加自定义key值，example：$i8n("xxx","' + value + '")');
  } else if (uuidKey && value && !keysMap[uuidKey]) {
    keysMap[uuidKey] = value;
  }
};

/**
 *
 * @returns {{}}
 */
module.exports.getKeysMap = function () {
  return keysMap;
};
