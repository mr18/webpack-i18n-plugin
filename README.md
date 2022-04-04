# 中文国际化插件，适用 vue，react

# react 项目 webpack 配置

```
    const i18nPlugin = require("webpack-i18n-plugin");
    const i18nConfig = {
        translation: {
            en_US: { source: [path.resolve(__dirname, "./locale/en_US/翻译文件.xlsx")] }, // 配置en_US 语言包
            ...
        }
    };

    // 配置plugins
    plugins: [
        ...
        new i18nPlugin(i18nConfig),
        ...
    ]

    // 配置loader
    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                loader: "webpack-i18n-plugin/loader",
                exclude: /node_modules/,
            },

        ],
    }
```

# vue 项目
