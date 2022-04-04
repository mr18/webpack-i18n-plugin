const babel = require("@babel/core");
const plugin = require("./plugin");
module.exports = function (source) {
  try {
    let result = babel.transformSync(source, {
      babelrc: false,
      plugins: [plugin],
    });
    console.log("\n----------------------------------------------------------------------------------------");
    console.log(source);
    console.log("\n=========================================================================================");
    console.log(result.code);
    console.log("\n!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

    // return result.code;
  } catch (e) {
    console.error(e);
  }
  return source;
};
