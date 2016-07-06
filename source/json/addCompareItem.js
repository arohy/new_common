/**
 * Добавление товара в сравнение
 */
var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function (id) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    'product[id]': _.toInteger(id)
  };

  return $.post('/compares.json', fields);
};