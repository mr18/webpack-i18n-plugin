(function () {
  let _this = window;
  _this.$LOCALE_VERSION = "${i18n_locale_language_version}";
  _this.$LOCALE = {};
  let $i8n = function (key, val) {
    return (_this.$LOCALE || {})[key] || val;
  };
  let $$i8n = function (val) {
    return val;
  };
  $i8n.locale = function (locale) {
    _this.$LOCALE = locale || {};
  };
  _this.$i8n = $i8n;
  _this.$$i8n = $$i8n;
})();
