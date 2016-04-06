/*
 * Отправление сообщения
 */

ISnew.json.sendMessage = function(message) {
  var result = $.Deferred()

  $.post('/client_account/feedback.json', message)
    .done(function(response) {
      if (message && response.status == 'ok') {
        result.resolve(response);
      } else {
        response.message = message;
        result.reject(response);
      }
    });

  return result.promise();
};

testSend = function(message) {
  ISnew.json.sendMessage(message)
    .done(function(response) {
      console.log('done', response);
    })
    .fail(function(response) {
      console.log('fail', response);
    })
}