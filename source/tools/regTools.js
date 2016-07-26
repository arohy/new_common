/** @private */
var _ = require('lodash');

/**
 * @module tools/RegTools
 *
 * @description
 * вспомогательный модуль для работы с регулярками и строками, которые будут использоваться как шаблоны
 */
var RegTools = function () {
  var self = this;

  self._toEscape = /[|\\{}()[\]^$+*?.]/g;
}

/**
 * @memberof module:tools/RegTools
 * @param {string} string - Строка для экранирования
 *
 * @description
 * Делаем экранирование спецсимволов во входной строке, чтобы при дальнейшем использовании в качестве шаблона не ломался парсер регулярок
 *
 * @example
 * RegTools.escape('\[]') -> '\\\[\]'
 */
RegTools.prototype.escape = function (string) {
  var self = this;

  if (!_.isString(string)) {
    console.warn('not string: ', string);
    return false;
  }

  return string.replace(self._toEscape, '\\$&');
};

module.exports = RegTools;