const { ConcatSource } = require("webpack-sources");
const babel = require("@babel/core");
const path = require("path");
class i18nPlugin {
  apply(compiler) {
    let rules = (compiler.options.module || {}).rules;
    let pitchIndex, prePitcher;
    rules.forEach((item, index) => {
      if (pitchIndex === undefined && typeof item.loader === "string" && /vue-loader/.test(item.loader) && /pitcher/.test(item.loader)) {
        try {
          pitchIndex = index;
          prePitcher = item;
        } catch (e) {}
      }
    });

    if (prePitcher) {
      rules.splice(pitchIndex, 1, {
        ...prePitcher,
        loader: path.resolve(__dirname, "./pitcher.js"),
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
