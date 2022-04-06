// babel插件的配置信息
let OPTIONS = {
  $i8n: '$i8n',
  // 排除不需要国际化配置的调用方法
  excludedCall: ['$i8n', 'require', '$$i8n', 'console.log'], // $$i8n('key','value') 标记不翻译字符
  // 排除不需要配置的字符串，
  excludedPattern: /\.\w+$/, // 默认文件名
};

module.exports = OPTIONS;
