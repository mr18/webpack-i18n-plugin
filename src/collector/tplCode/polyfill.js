(function () {
  window.$LOCALE_VERSION = "${i18n_locale_language_version}";
  window.$LOCALE = {};
  let $i8n = function (key, val) {
    if (key && typeof val === "string") {
      return (window.LOCALE || {})[key] || val;
    }
    return val;
  };
  let $$i8n = function (val) {
    return val;
  };
  $i8n.locale = function (locale) {
    window.LOCALE = locale || {};
  };
  window.$i8n = $i8n;
  window.$$i8n = $$i8n;
})();
