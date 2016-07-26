/**
 * @memberof module:ajaxAPI/cart
 * @alias update
 *
 * @description
 * Обновление состава корзины.
 * Позволяет:
 * - обновить состав корзины
 * - удалить несколько позиций
 * - добавить несколько позиций
 * - изменить кол-во товаров позиции
 * - установить комментарии к позициям
 *
 * @param {Object} items - набор пар {variant_id: quantity, ...}. Если quantity = 0, то позиция удаляется из корзины, в противном случае устанавливается указанное кол-во
 * @param {Object} options - дополнительные поля: comments, coupon
 * @param {Object} options.comments - объект с комментариями вида {variant_id: comment, ...}
 * @param {string} options.coupon - название купона
 *
 * @return {$.Deferred} $.promise
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
 * ajaxAPI.cart.update(items, optins)
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) });
 */

module.exports = function (items, options) {
  var URL = require('../../tools/url');
  var $ = require('jquery');
  var _ = require('lodash');

  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang,
    '_method': 'put'
  };
  var dfd = $.Deferred();

  options = options || {};

  _.forIn(items, function (quantity, variant_id) {
    fields['cart[quantity]['+ variant_id +']'] = _.toInteger(quantity);
  });

  _.forIn(options.comments, function (comment, variant_id) {
    fields['cart[order_line_comments]['+ variant_id +']'] = comment;
  });

  if (options.coupon) {
    fields['cart[coupon]'] = options.coupon;
  }

  $.post('/cart_items.json', fields)
    .done(function (response) {
      _.forEach(response.items, function (item) {
        if (item && _lang) {
          item.product_url += '?lang='+ _lang;
          item.product.url += '?lang='+ _lang;
        }
      });

      dfd.resolve(response);
    })
    .fail(function (response) {
      dfd.reject(response);
    });

  return dfd.promise();
};