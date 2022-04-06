(function () {
  let _this = window;
  let $i8n = function (key, val) {
    return ($i8n.package || {})[key] || val;
  };
  let $$i8n = function (val) {
    return val;
  };
  $i8n.package = {};
  $i8n.version = "${i18n_locale_language_version}";
  $i8n.locale = function (locale) {
    $i8n.package = locale || {};
  };
  _this.$i8n = $i8n;
  _this.$$i8n = $$i8n;
})();
