/*
 * Отправление сообщения
 */

ISnew.json.sendMessage = function (input) {
  var URL = new ISnew.tools.URL();
  var result = $.Deferred();
  var message = {
    lang: URL.getKeyValue('lang')
  };

  _.forIn(input, function (value, key) {
    message['feedback['+ key +']'] = value;
  });

  $.post('/client_account/feedback.json', message)
    .done(function (response) {
      if (message && response.status == 'ok') {
        result.resolve(response);
      } else {
        response.message = message;
        result.reject(response);
      }
    });

  return result.promise();
};