/*
 * Тест для getProduct()
 */

testGetProduct = function (id) {
  ISnew.json.getProduct(id)
    .done(function(response) {
      console.log('done', response);
    })
    .fail(function(response) {
      console.log('fail', response);
    })
}