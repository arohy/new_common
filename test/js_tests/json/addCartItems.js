/*
 * Тест для addCartItems()
 */

testAddCartItems = function (items) {
  ISnew.json.addCartItems(items)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}