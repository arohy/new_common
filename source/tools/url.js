/**
 * Тул для разбора url.
 */
ISnew.tools.URL = function () {
  var self = this;

  self.init();
};

/**
 * Разбор урла
 */
ISnew.tools.URL.prototype.init = function () {
  var self = this;
  self.keys = {};

  var windowLocation = window.location;
  var temp;

  //self.search = self.search;

  _.chain(windowLocation.search.replace('?', ''))
    .split('&')
    .forEach(function (part) {
      if (part !== '') {
        part = part.split('=');
        self.keys[part[0]] = part[1];
      }
    })
    .value();

  return;
};
/**
 * Вытаскиваем значение ключа
 */
ISnew.tools.URL.prototype.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};
