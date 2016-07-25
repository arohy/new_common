/**
 * @module tools/translit
 *
 * @description
 * Производим транслитерацию строки
 */
/** @private */
var _ = require('lodash');

var Translit = function( string ) {
  var self = this;

  var space = '_';

  self.translit = {
    'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
    'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
    'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
    'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
    ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
    '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
    '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space,
    ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
    '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
    '?': space, '<': space, '>': space, '№':space
  };
};

/**
 * Основной метод.
 * @memberof module:tools/translit
 * @param {string} string - строка для транслитерации
 *
 * @return {string} Транслитеровання строка
 */
Translit.prototype.replace = function (string) {
  var self = this;

  return _.reduce(string.toLowerCase(), function(test, symbol) {
    if (self.translit[symbol] !== undefined) {
      test += self.translit[symbol];
    } else {
      test += symbol;
    }

    return test;
  }, '');
}

module.exports = Translit;