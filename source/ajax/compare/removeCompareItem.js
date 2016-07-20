/*
 * Удаление товара из сравнения
 */
var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function (id) {
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
      _method: 'delete',
    };
  var path   = '/compares/'+ _.toInteger(id) +'.json';

  return $.post(path, fields);
};