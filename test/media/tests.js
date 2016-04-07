/*
 * Тест для addCartItems()
 */

testAddCartItems = function(items) {
  ISnew.json.addCartItems(items)
    .done(function(response) {
      console.log(response);
    })
    .fail(function(response) {
      console.log(response);
    })
}
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
/*
 * Тест для getProductsList()
 */

testGetProductList = function (id_list) {
  ISnew.json.getProductsList (id_list)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}
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