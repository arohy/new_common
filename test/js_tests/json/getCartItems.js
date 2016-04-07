/*
 * Тест для getCartItems
 */

testGetCartItems = function() {
  ISnew.json.getCartItems()
    .done(function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    });
}