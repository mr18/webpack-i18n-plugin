const path = require("path");
const i18n = require("./i18n");
class i18nPlugin {
  constructor(config) {
    this.i18nConfig = config;
  }
  apply(compiler) {
    let module = (compiler.options || {}).module || {};
    let pitchIndex, prePitcher;

    let rules = module.rules || [];

    // 针对vue中template的pitcher，拦截处理
    rules.forEach((item, index) => {
      if (!prePitcher && typeof item.loader === "string" && /vue-loader/.test(item.loader) && /pitcher/.test(item.loader) && !/i18n-loader/.test(item.loader)) {
        pitchIndex = index;
        prePitcher = item;
      }
    });

    if (prePitcher) {
      rules.splice(pitchIndex, 1, {
        ...prePitcher,
        loader: path.resolve(__dirname, "./loader/pitcher.js"),
        options: {
          ...(prePitcher.options || {}),
          prePitcher,
        },
      });
    }
    module.rules = rules;
    // console.log(compiler.options.module.rules);
    compiler.hooks.emit.tap("i18nPlugin", (compilation) => {
      i18n(this.i18nConfig);
    });
  }
}
module.exports = i18nPlugin;
