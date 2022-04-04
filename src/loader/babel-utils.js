const utils = require("./utils");
const types = require("@babel/types");
const ora = require("ora");
const myOra = ora();

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
    return types.isArrowFunctionExpression(node) || types.isFunctionDeclaration(node) || types.isFunctionExpression(node) || types.isClassExpression(node) || types.isClassDeclaration(node);
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
        myOra.warn("配置错误,key: " + key + " 值不可为空，请检查");
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
  let callName = "";

  // 多级命名空间,如：xxx.xxx.xxx
  function callObjName(callObj, name) {
    name += "." + callObj.property.name;
    if (types.isMemberExpression(callObj.object)) {
      return callObjName(callObj.object, name);
    }
    name = callObj.object.name + name;
    return name;
  }

  if (types.isCallExpression(node)) {
    if (types.isMemberExpression(node.callee)) {
      callName = callObjName(node.callee, "");
    } else {
      callName = node.callee.name || "";
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
  value = (value || "").trim();
  let valStr = value.replace(/'/g, '"').replace(/(\n)/g, "\\n");
  key = key || utils.genUuidKey(value);
  utils.collectKeys(key, value);
  if (isExpression) {
    let valueExp = Object.assign(types.stringLiteral(value), {
      extra: {
        raw: `'${valStr}'`, // 防止转码为unicode
        rawValue: value,
      },
    });
    return types.callExpression(types.identifier(process.$AI_OPTIONS.$i8n), [types.stringLiteral(key), valueExp]);
  } else {
    return `${process.$AI_OPTIONS.$i8n}('${key}','${valStr}')`;
  }
};
