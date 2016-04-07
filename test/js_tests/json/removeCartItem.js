/**
 * Тест для removeCartItem()
 */

testRemoveItem = function(id) {
  ISnew.json.removeCartItem(id)
    .done(function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    });
}