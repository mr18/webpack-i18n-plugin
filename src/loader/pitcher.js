const qs = require("querystring");
const loaderUtils = require("loader-utils");
const isPitcher = (l) => l.path !== __filename;
const isNullLoader = (l) => /(\/|\\|@)null-loader/.test(l.path);
const loaderPath = require.resolve("./loader");
const templateLoaderPath = require.resolve("@vue/vue-loader-v15/lib/loaders/templateLoader.js");

module.exports = function (source) {
  // console.log(source);
  return source;
};

module.exports.pitch = function (remainingRequest) {
  const options = loaderUtils.getOptions(this);
  const { cacheDirectory, cacheIdentifier } = options;
  const query = qs.parse(this.resourceQuery.slice(1));
  let loaders = this.loaders;
  // remove self
  loaders = loaders.filter(isPitcher);

  // do not inject if user uses null-loader to void the type (#1239)
  if (loaders.some(isNullLoader)) {
    return;
  }
  const genRequest = (loaders) => {
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

    return loaderUtils.stringifyRequest(this, "-!" + [...loaderStrings, this.resourcePath + this.resourceQuery].join("!"));
  };

  let prePitcher = options.prePitcher;
  let prePitcherLoader = require(prePitcher.loader);
  let request = prePitcherLoader.pitch.call({ ...this, loaders }, remainingRequest);
  if (query.type === "template") {
    const path = require("path");
    const cacheLoader =
      cacheDirectory && cacheIdentifier
        ? [
            `${require.resolve("cache-loader")}?${JSON.stringify({
              // For some reason, webpack fails to generate consistent hash if we
              // use absolute paths here, even though the path is only used in a
              // comment. For now we have to ensure cacheDirectory is a relative path.
              cacheDirectory: (path.isAbsolute(cacheDirectory) ? path.relative(process.cwd(), cacheDirectory) : cacheDirectory).replace(/\\/g, "/"),
              cacheIdentifier: hash(cacheIdentifier) + "-vue-loader-template",
            })}`,
          ]
        : [];

    const newRequest = genRequest([...cacheLoader, loaderPath, templateLoaderPath + `??vue-loader-options`]);

    // the template compiler uses esm exports

    return `export * from ${newRequest}`;
  } else if (query.type === "script") {
    console.log(remainingRequest);
  }

  // console.log(request);
  return request;

  // loader: 'E:\\private\\vue-demo\\node_modules\\@vue\\vue-loader-v15\\lib\\loaders\\pitcher.js',
  // resourceQuery: [Function: resourceQuery],
  // options: { cacheDirectory: undefined, cacheIdentifier: undefined }
  //   console.log(options);
  //  loader: 'E:\\private\\vue-demo\\node_modules\\@vue\\vue-loader-v15\\lib\\loaders\\pitcher.js',
  // resourceQuery: [Function: resourceQuery],
  // options: { cacheDirectory: undefined, cacheIdentifier: undefined }
};
