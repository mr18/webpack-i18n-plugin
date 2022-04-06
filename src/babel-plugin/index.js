const visitors = require("./visitors");

const plugin = function (api, config) {
  return {
    visitor: {
      StringLiteral: visitors.StringLiteral,
      JSXText: visitors.JSXText,
      TemplateElement: visitors.TemplateElement,
      CallExpression: visitors.CallExpression,
    },
  };
};

/**
 *
 * @type {plugin}
 */
module.exports = plugin;
