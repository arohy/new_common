EventBus.subscribe('update_variant:insales:product', function (data){

  var orderItem = 0;

  var productPrice = data.price;
  var productAvailable = data.available;
  var productOldPrice = data.old_price || false;
  var productSku = data.sku || false;
  var productQuantity = (data.quantity === null) ? -1 : data.quantity;
  var productId = data.product_id;
  var variantId = data.id;

  _.forEach(Cart.order.order_lines, function(value, key) {
    if (value.variant_id == variantId) {
      orderItem = value.quantity;
    }
  });

  renderProd(productPrice, productOldPrice, productSku, productQuantity, productId, productAvailable, orderItem, variantId)
})

function renderProd(productPrice, productOldPrice, productSku, productQuantity, productId, productAvailable, orderItem, variantId) {
  var $formSelector = $('[data-product-id="'+productId+'"]')
  var $variantInfo = $formSelector.find('.variant-info');

  var dataProduct = {
    available: productAvailable,
    variant_id: variantId,
    price: productPrice,
    old_price: productOldPrice,
    sku: productSku,
    order_item: orderItem,
    quantity: productQuantity
  }
  //Функция которая компилирует шаблон
    var compile = _.template(document.getElementById('variant-info').innerHTML);

    //Передаём функции объект корзины и получаем скомпилированный HTML
    var htmlTemplate = compile(dataProduct);

    //Перезаписываем верстку виджета
    $formSelector.find('.variant-info').html(htmlTemplate);
}
