/**
 *
 * @type {{prefixKey: string, $i8n: string, excludedCall: [string,string,string,string,string], excludedPattern: RegExp}}
 */
let options = {
  // uuidKey 前缀
  // prefixKey: "I_",
  $i8n: "$i8n",
  // 排除不需要国际化配置的调用方法
  excludedCall: ["$i8n", "require", "$$i8n", "console.log"], // $$i8n('key','value') 标记不翻译字符
  // 排除不需要配置的字符串，
  excludedPattern: /\.\w+$/, // 默认文件名
};

process.$AI_OPTIONS = options;

module.exports = options;
