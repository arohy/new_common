/*
 * Тест для getCartItems
 */

testGetCartItems = function () {
  ISnew.json.getCartItems()
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}