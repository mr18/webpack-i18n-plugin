# 中文国际化插件，适用 vue，react

[DEMO](./demo)

### 安装

```
npm install webpack-i18n-plugin -D
```

### `react` 项目`webpack`配置

```
    const i18nPlugin = require("webpack-i18n-plugin");

    // 配置loader
    rules: [
        {
            test: /\.(j|t)sx?$/,
            loader: "webpack-i18n-plugin/loader",
            exclude: /node_modules/,
        },
    ],

    // 配置plugins
    plugins: [
        ...
        new i18nPlugin(i18nConfig),
        ...
    ]
```

### `vue` 项目`webpack`配置

```
    chainWebpack: (config) => {

        // 配置loader
        config.module.rule("i18n")
        .test(/\.(t|j)sx?$/).use("i18n-loader")
        .loader("webpack-i18n-plugin/loader");

        // 配置plugins
        config.plugin("i18n").use(i18nPlugin).tap((options) => {
            return [...options, i18nConfig];
        });


    }
```

### 插件配置项`i18nConfig`

```
    const i18nConfig = {
        i18nDir: path.resolve(__dirname, "./i18n"), //国际化配置输出目录（可选）
        translation: {
            // 配置en_US 语言包
            en_US: { source: [path.resolve(__dirname, "./locale/en_US/翻译文件.xlsx")] },
            ...
        }
    };
```

### License

[MIT License](https://github.com/mr18/webpack-i18n-plugin/blob/master/LICENSE).
