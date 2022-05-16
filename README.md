# 中文国际化插件，适用于 vue，react

### [DEMO](./demo)

#### 插件的工作方式：
在babel编译过程中，根据AST语法树自动提取中文资源(zh_CN) -> 并自动转换成$i8n翻译函数 -> 通过excel配置，生成翻译资源 -> 引入对应的语言包，完成国际化。

### 安装

```
npm install webpack-i18n-plugin -D
```

为了兼容 vue 和 react，需要同时配置 webpack plugins 和 babel plugins

### webpack plugins 配置

```
// webpack.config.js
const WebpackI18nPlugin = require("webpack-i18n-plugin");
plugins: [
  ...
  new WebpackI18nPlugin(i18nConfig),
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

### 切换语言

确保语言包最先加载到页面中，中文无需引入语言包

```
// 页面入口 app.js
const en_US = require("./i18n/en_US"); // 对应语言包
window.$i8n.locale(en_US); // $i18n为全局变量
// other code
```

### 插件配置项 `Object`

| 名称        | 说明                                                            | 类型      | 必选 | 默认值 |
| ----------- | --------------------------------------------------------------- | --------- | ---- | ------ |
| translation | 对应语言的翻译内容                                                  | `Object`  | 是   | `-`      |
| i18nDir     | 国际化输出目录                                                  | `String`  | 否   | `i18n` |
| makefile    | 是否输出国际化内容<br/>国际化内容不发生变化时，可设置为 `false` | `Boolean` | 否   | `true`   |


示例

```
const i18nConfig = {
  translation: {
    en_US: [path.resolve(__dirname, "翻译文件.xlsx")], //en_US语言包
    ja_JP:'',
    ...
  },
};
```

[翻译文件格式参考](https://github.com/mr18/webpack-i18n-plugin/blob/master/demo/react/output/en_US/%E7%BF%BB%E8%AF%91%E5%86%85%E5%AE%B9.xlsx)
### 备注

1. 编译结果暴露 `$i8n` `$$i8n` 全局方法
2. 编译后，关注`build`输出日志，直到无待翻译数据
3. 如果语言包无法更新，清理node_modules/.cache后重新编译

欢迎fork，提交issues.




### License

[MIT License](./LICENSE).
