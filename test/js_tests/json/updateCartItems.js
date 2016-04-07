/**
 * Тест для updateCartItems();
 */

testUpdateCartItems = function (items) {
  ISnew.json.updateCartItems(items)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}