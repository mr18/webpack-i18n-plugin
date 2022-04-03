const qs = require("querystring");
const isPitcher = (l) => l.path !== __filename;
const isNullLoader = (l) => /(\/|\\|@)null-loader/.test(l.path);
const loaderPath = require.resolve("./loader.js");

module.exports = function (source) {
  // console.log(source);
  return source;
};

module.exports.pitch = function (remainingRequest) {
  const options = this.getOptions(this);
  console.log(options);
  const { cacheDirectory, cacheIdentifier } = options;
  const query = qs.parse(this.resourceQuery.slice(1));
  let loaders = this.loaders;
  // remove self
  loaders = loaders.filter(isPitcher);

  // do not inject if user uses null-loader to void the type (#1239)
  if (loaders.some(isNullLoader)) {
    return;
  }
  const genRequest = (loaders, request) => {
    // Important: dedupe since both the original rule
    // and the cloned rule would match a source import request.
    // also make sure to dedupe based on loader path.
    // assumes you'd probably never want to apply the same loader on the same
    // file twice.
    // Exception: in Vue CLI we do need two instances of postcss-loader
    // for user config and inline minification. So we need to dedupe baesd on
    // path AND query to be safe.
    const seen = new Map();
    const loaderStrings = [];

    loaders.forEach((loader) => {
      const identifier = typeof loader === "string" ? loader : loader.path + loader.query;
      const request = typeof loader === "string" ? loader : loader.request;
      if (!seen.has(identifier)) {
        seen.set(identifier, true);
        // loader.request contains both the resolved loader path and its options
        // query (e.g. ??ref-0)
        loaderStrings.push(request);
      }
    });
    let loadRequest = request.replace(/[\'\"]$/, "").split("-!");

    return loaderUtils.stringifyRequest(this, "-!" + [...loaderStrings, loadRequest[1]].join("!"));
  };

  let prePitcher = options.prePitcher;
  let prePitcherLoader = require(prePitcher.loader);
  let request = prePitcherLoader.pitch.call({ ...this, loaders }, remainingRequest);
  if (query.type === "template") {
    const newRequest = genRequest([loaderPath], request);

    // the template compiler uses esm exports
    console.log(`export * from ${newRequest}`);
    return `export * from ${newRequest}`;
  } else if (query.type === "script") {
    console.log(remainingRequest);
  }

  // console.log(request);
  return request;
};
