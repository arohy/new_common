/**
 * @module ajaxAPI/cart/add
 *
 * @description
 * Добавление товара в корзину.
 *
 * @param {Object} items -  объект с добавляемыми модификациями и их кол-вом {variant_id: quantity, ...}
 * @param {Object} options - объект с дополнительными полями: comments, coupon
 * @param {Object} options.comments - объект с комментариями вида {variant_id: comment, ...}
 * @param {string} options.coupon - название купона
 *
 * @return {$.ajax} $.post()
 *
 * @example
 * var items = {
 *   123456: 1,
 *   123457: 3,
 *   123450: 100
 * };
 *
 * var options = {
 *   comments: { 123456: 'Ваш комментарий' },
 *   coupon: 'test'
 * }
 *
 * ajaxAPI.cart.add(items, options)
 *  .done(function (onDone) { console.log ('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log ('onFail:', onFail) });
 */
module.exports = function (items, options) {
  var URL = require('../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };

  options = options || {};

  _.forIn(items, function (quantity, variant_id) {
    fields['variant_ids['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  return $.post('/cart_items.json', fields);
}