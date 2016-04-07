/**
 * Тест для sendMessage();
 */

testSendMessage = function (message) {
  ISnew.json.sendMessage(message)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}