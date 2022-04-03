/**
 *
 * @type {{plugins: [string,null,string,string,string,string,string,string,string,string,string]}}
 */
module.exports = {
  plugins: [
    '@babel/plugin-syntax-jsx',
    ['@babel/plugin-proposal-decorators', { 'legacy': true }],
    '@babel/plugin-syntax-class-properties',
    '@babel/plugin-syntax-object-rest-spread',
    '@babel/plugin-syntax-async-generators',
    '@babel/plugin-syntax-do-expressions',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-export-extensions',
    '@babel/plugin-syntax-flow',
    '@babel/plugin-syntax-function-bind',
    '@babel/plugin-syntax-function-sent',
  ]
}