/**
 * Тул для разбора url.
 */
ISnew.tools.URL = function () {
  var self = this;

  self._init();
};

/**
 * Разбор урла
 */
ISnew.tools.URL.init = function () {
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
ISnew.tools.URL.getKeyValue = function (key) {
  var self = this;

  return self.keys[key];
};

/**
 * Запуск тулзы
 */
ISnew.tools.URL.init();