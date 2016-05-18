var ProductsConfig = {
  product_id: 'data-product-id',
  show_variants: true,
  init_option: true,
  options: {
      'Цвет': 'option-images',
      'Размер': 'option-span',
      'Материал': 'option-span',
      'Жесткий диск': 'option-span'
    }
}
var Products = new ISnew.Products(ProductsConfig);

EventBus.subscribe('update_variant:insales:product', function (data){

  var productPrice = data.price;
  var productAvailable = data.available;
  var productOldPrice = data.old_price || false;
  var productSku = data.sku || false;
  var productQuantity = (data.quantity === null) ? -1 : data.quantity;
  var productId = data.product_id;

  renderProd(productPrice, productOldPrice, productSku, productQuantity, productId, productAvailable)
})

function renderProd(productPrice, productOldPrice, productSku, productQuantity, productId, productAvailable) {
  var $formSelector = $('[data-product-id="'+productId+'"]')
  var $variantInfo = $formSelector.find('.variant-info');

  var dataProduct = {
    available: productAvailable,
    price: productPrice,
    old_price: productOldPrice,
    sku: productSku,
    quantity: productQuantity
  }
  //Функция которая компилирует шаблон
    var compile = _.template(document.getElementById('variant-info').innerHTML);

    //Передаём функции объект корзины и получаем скомпилированный HTML
    var htmlTemplate = compile(dataProduct);

    //Перезаписываем верстку виджета
    $formSelector.find('.variant-info').html(htmlTemplate);
}
