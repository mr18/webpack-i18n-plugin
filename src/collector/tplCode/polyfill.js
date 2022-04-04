window.$LOCALE_VERSION = "${version}";
window.$LOCALE = {};
window.$i8n = function (key, val) {
  if (key && typeof val === "string") {
    return (window.LOCALE || {})[key] || val;
  }
  return val;
};
window.$$i8n = function (val) {
  return val;
};
export function locale(locale) {
  window.LOCALE = locale || {};
}
