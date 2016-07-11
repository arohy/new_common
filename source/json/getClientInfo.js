var URL = require('../tools/url');
var $ = require('jquery');
var _ = require('lodash');

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