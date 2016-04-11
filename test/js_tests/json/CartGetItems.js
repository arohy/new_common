/*
 * Тест для CartGetItems
 */

testCartGetItems = function () {
  ISnew.json.CartGetItems()
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}