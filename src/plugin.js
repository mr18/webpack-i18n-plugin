const path = require("path");
const collector = require("./collector");
class i18nPlugin {
  constructor(config) {
    this.i18nConfig = config;
  }
  apply(compiler) {
    let rules = (compiler.options.module || {}).rules;
    let pitchIndex, prePitcher;
    rules.forEach((item, index) => {
      if (!prePitcher && /vue-loader/.test(item.loader) && /pitcher/.test(item.loader) && !/i18n-loader/.test(item.loader)) {
        pitchIndex = index;
        prePitcher = item;
      }
    });

    if (prePitcher) {
      let i18nPitcher = {
        ...prePitcher,
        loader: path.resolve(__dirname, "./loader/pitcher.js"),
        resourceQuery: prePitcher.resourceQuery,
        options: {
          ...prePitcher.options,
          prePitcher,
        },
      };
      rules.splice(pitchIndex, 1, i18nPitcher);
      (compiler.options.module || {}).rules = rules;
    }
    compiler.hooks.emit.tap("i18nPlugin", (compilation) => {
      collector(this.i18nConfig);
    });
  }
}
module.exports = i18nPlugin;
