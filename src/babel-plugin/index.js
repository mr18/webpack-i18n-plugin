const _options = require('./options');
const utils = require('./utils');
const types = require('@babel/types');
const babel = require('@babel/core');
const babelUtils = require('./babel-utils');
const ora = require('ora');
const myOra = ora();
/**
 *
 * @param api
 * @param config
 * @returns {{visitor: {StringLiteral: (function(*=)), ObjectProperty: (function(*=)), JSXText: (function(*)), TemplateElement: (function(*)), CallExpression: (function(*=))}}}
 */
const plugin = function (api, config) {
  let options = Object.assign({}, _options, config);
  let {StringLiteral,JSXText,TemplateElement,CallExpression} = getPluginType(options)
  return {
    visitor: {
      StringLiteral:StringLiteral,
      JSXText:JSXText,
      TemplateElement:TemplateElement,
      CallExpression:CallExpression
    },
  };
};

/**
 *
 * @type {plugin}
 */
module.exports = plugin;
