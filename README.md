# 中文国际化插件，适用于 vue，react

[DEMO](./demo)

### 安装

```
npm install webpack-i18n-plugin -D
```

为了兼容 vue 和 react，需要同时配置 webpack plugins 和 babel plugins

### webpack plugins 配置

```
// webpack.config.js
const i18nPlugin = require("webpack-i18n-plugin");
plugins: [
  ...
  new i18nPlugin(i18nConfig),
  ...
]
```
```
// vue.config.js
chainWebpack: (config) => {
  config
    .plugin('i18n')
    .use('webpack-i18n-plugin')
    .tap(() => {
      return [i18nConfig];
    });
}
```

### babel plugins 配置

```
// .babelrc | babel.config.js

plugins:[
  ...
  "webpack-i18n-plugin/babel"
]
```

### 插件配置项`i18nConfig`

```
const i18nConfig = {
  i18nDir: path.resolve(__dirname, "./i18n"), //国际化目录（可选）
  translation: {
    en_US: [path.resolve(__dirname, "翻译文件.xlsx")], //en_US语言包
    ...
  },
};
```
### 切换语言
确保语言包最先加载到页面中，中文无需引入语言包
```
// 页面入口 app.js
const en_US = require("./i18n/en_US"); // 对应语言包
window.$i8n.locale(en_US); // $i18n为全局变量
// other code
```
### 备注

1. 编译结果暴露 `$i8n` `$$i8n` 全局方法
2. 编译后，关注`build`输出日志，直到无待翻译数据
3. 如果语言包无法更新，清理node_modules/.cache后重新编译

### License

[MIT License](./LICENSE).
