/** @private */
var URL = require('../../tools/url');
/** @private */
var $ = require('jquery/dist/jquery.min');
/** @private */
var _ = require('lodash');

/**
 * @memberof module:ajaxAPI/shop
 * @alias client
 *
 * @description
 * Получение информации о посетителе сайта
 *
 * @return {JSON}
 * Если пользователь залогинен, получим json с акутальной информацией о покупателе
 * { status: "ok", client: { // информация о покупателе }}
 *
 * В случае, если пользователь не залогинен, получим
 * { status: "error", message: "Not authorized", url: "/client_account/session/new" }
 *
 * @example
 * ajaxAPI.shop.client()
 *  .done(function (onDone) { console.log('onDone: ', onDone) })
 *  .fail(function (onFail) { console.log('onFail: ', onFail) })
 */

module.exports = function (){
  var _lang = URL.getKeyValue('lang') || '';
  var fields = {
    lang: _lang
  };
  var result = $.Deferred();

  $.getJSON('/client_account/contacts.json', fields)
    .done(function (response) {
      switch (response.status) {
        case 'error':
          result.resolve({
            message: response.message,
            url: response.url,
            authorized: false
          });
          break;
        default:
          result.resolve(_.merge(response.client, { authorized: true }));
      }
    })
    .fail(function (response) {
      console.log('json.getClientInfo: fail: ', response);
      result.reject(response);
    });

  return result.promise();
};