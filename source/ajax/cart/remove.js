/** @private */
var URL = require('../../tools/url');
/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');

/**
 * @memberof module:ajaxAPI/cart
 * @alias remove
 *
 * @description Удаление товара из корзины.
 *
 * @param {Number} variant_id - id модификации
 *
 * @return {$.ajax}
 *
 * @example
 * ajaxAPI.cart.remove(123123)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (variant_id) {
  var path = '/cart_items/'+ _.toInteger(variant_id) +'.json';
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    '_method': 'delete'
  };

  return $.post(path, fields);
};