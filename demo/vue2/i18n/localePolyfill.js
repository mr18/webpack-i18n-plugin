window.$LOCALE_VERSION = "v_1nl9j665";
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
