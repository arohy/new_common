/**
 * Тест для updateCartItems();
 */

testUpdateCartItems = function (items, comments) {
  ISnew.json.updateCartItems(items, comments)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}