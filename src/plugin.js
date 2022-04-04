const path = require("path");
class i18nPlugin {
  apply(compiler) {
    let rules = (compiler.options.module || {}).rules;
    let pitchIndex, prePitcher;
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
        resourceQuery: prePitcher.resourceQuery,
        options: {
          ...(prePitcher.options || {}),
          prePitcher,
        },
      });
    }
    (compiler.options.module || {}).rules = rules;
  }
}
module.exports = i18nPlugin;
