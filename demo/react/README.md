# 1

`npm i`

# 2

`npm run build`

运行结果输出: `待翻译内容.xlsx`

将 `待翻译内容.xlsx` 翻译到对应的 excel 或 js 文件中，格式如下(`key`列 与 `text`列保持一一对应)，并在 i18n.config.js 中加入 translation 配置项

# END

---

## 翻译文件示例

![image](https://user-images.githubusercontent.com/4214624/148220844-94e4196f-4063-4fd9-af25-060beab8bdc5.png)

## 最终效果

> ps: 该插件不影响源代码，无痕开发，具体结果可查看编译后的代码

![image](https://user-images.githubusercontent.com/4214624/148202978-626bdd94-5791-48ab-97e4-dbcea0cd04c9.png)

"@babel/core": "^7.17.8",
"@babel/plugin-proposal-decorators": "^7.17.8",
"@babel/plugin-syntax-async-generators": "^7.8.4",
"@babel/plugin-syntax-class-properties": "^7.12.13",
"@babel/plugin-syntax-do-expressions": "^7.16.7",
"@babel/plugin-syntax-dynamic-import": "^7.8.3",
"@babel/plugin-syntax-flow": "^7.16.7",
"@babel/plugin-syntax-function-bind": "^7.16.7",
"@babel/plugin-syntax-function-sent": "^7.16.7",
"@babel/plugin-syntax-jsx": "^7.16.7",
"@babel/plugin-syntax-object-rest-spread": "^7.8.3",
"@babel/plugin-transform-runtime": "^7.12.1",
"@babel/preset-env": "^7.11.0",
"@babel/preset-react": "^7.8.3",
"@babel/preset-typescript": "^7.16.7",
"babel-loader": "^8.2.1",
"cross-env": "^7.0.3",
"html-webpack-plugin": "^4.5.0",
"ts-loader": "^9.2.6",
"typescript": "^4.5.4",
"webpack": "^5.6.0",
"webpack-cli": "^4.2.0",
"webpack-dev-server": "^4.7.3"
