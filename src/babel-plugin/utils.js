const types = require('@babel/types');
const ora = require('ora');
const myOra = ora();
const OPTIONS = require('./options');

/**
 *
 * @param value
 * @param prefixKey
 * @returns {string}
 */

const genUuidKey = function (value, prefixKey) {
  let valArr = (value || '').trim().split('');
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
  return (prefixKey || '') + uniqueKey;
};
module.exports.genUuidKey = genUuidKey;

/**
 *
 * @param val
 * @returns {boolean}
 */
module.exports.isChinese = function (val) {
  return /[\u4e00-\u9fa5\u3002\uff1b\uff0c\uff1a\u201c\u201d\uff08\uff09\u3001\uff1f\u300a\u300b]/.test(val);
};

/**
 *
 * @param key
 * @returns {string}
 */
module.exports.genPropertyKey = function (key) {
  return '$_' + (key || '');
};

/**
 *
 * @type {{}}
 */
let I18N_MAP = {};

/**
 *
 * @param uuidKey
 * @param value
 */
const collectKeys = function (uuidKey, value) {
  value = (value || '').replace(/'/g, '"').trim();
  if (I18N_MAP[uuidKey] && value && I18N_MAP[uuidKey] !== value) {
    myOra.warn('存在重复的key：' + uuidKey + ' ---> ' + I18N_MAP[uuidKey] + ' ---> ' + value);
    myOra.succeed(' > 请给其中之一添加自定义key值，example：$i8n("key","' + value + '")');
  } else if (uuidKey && value && !I18N_MAP[uuidKey]) {
    I18N_MAP[uuidKey] = value;
  }
};
module.exports.collectKeys = collectKeys;

/**
 *
 * @returns {{}}
 */
module.exports.getI18nMap = function () {
  return I18N_MAP;
};

/**
 * 查找父集为ObjectExpression的node
 * @param path
 * @returns {*}
 */
module.exports.findPropertyParent = function (path) {
  let deepLength = 0;
  return path.findParent((path) => {
    deepLength++;
    return deepLength === 2 && types.isObjectExpression(path.node);
  });
};

/**
 * 类函数父集
 * @param path
 * @returns {*}
 */
module.exports.findParentFunctionLikeExpression = function findParentFunctionLikeExpression(path) {
  return path.findParent(($path) => {
    let node = $path.node;
    return (
      types.isArrowFunctionExpression(node) ||
      types.isFunctionDeclaration(node) ||
      types.isFunctionExpression(node) ||
      types.isClassExpression(node) ||
      types.isClassDeclaration(node)
    );
  });
};

/**
 * 取得uuidKey对应的属性key
 * @param properties
 * @param key
 * @returns {*}
 */
module.exports.getKeyProperty = function (properties, key) {
  let node = null;
  properties.forEach((item) => {
    if (item.key && item.key.name === key) {
      node = item;
      if (!item.value.value) {
        myOra.warn('配置错误,key: ' + key + ' 值不可为空，请检查');
      }
    }
  });
  return node;
};

/**
 * 查找调用方法名
 * @param node
 * @returns {string}
 */
module.exports.getCallExpressionName = function (node) {
  let callName = '';

  // 多级命名空间,如：xxx.xxx.xxx
  function callObjName(callObj, name) {
    name += '.' + callObj.property.name;
    if (types.isMemberExpression(callObj.object)) {
      return callObjName(callObj.object, name);
    }
    name = callObj.object.name + name;
    return name;
  }

  if (types.isCallExpression(node)) {
    if (types.isMemberExpression(node.callee)) {
      callName = callObjName(node.callee, '');
    } else {
      callName = node.callee.name || '';
    }
  }
  return callName;
};

/**
 * 生成翻译函数
 * @param value
 * @param isExpression
 * @param key
 * @returns {*}
 */
module.exports.genAIExpression = function (value, isExpression, key) {
  value = (value || '').trim();
  let valStr = value.replace(/'/g, '"').replace(/(\n)/g, '\\n');
  key = key || genUuidKey(value);
  collectKeys(key, value);
  if (isExpression) {
    let valueExp = Object.assign(types.stringLiteral(value), {
      extra: {
        raw: `'${valStr}'`, // 防止转码为unicode
        rawValue: value,
      },
    });
    return types.callExpression(types.identifier(OPTIONS.$i8n), [types.stringLiteral(key), valueExp]);
  } else {
    return `${OPTIONS.$i8n}('${key}','${valStr}')`;
  }
};
