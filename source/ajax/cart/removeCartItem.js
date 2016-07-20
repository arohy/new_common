/*
 * Удаление товара из корзины
 */
var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

module.exports = function (variant_id) {
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    '_method': 'delete'
  };

  return $.post(path, fields);
};