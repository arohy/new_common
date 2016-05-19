var Cart = new ISnew.Cart();

EventBus.subscribe('update_items:insales:cart', function (data) {
  var cart_widget_html = Template.render(data, 'cart_widget')

  $('.js-cart').html(cart_widget_html);

  _.forEach(data.order_lines, function(value, key) {
    $('[data-item-cart]').html('0');
    $('[data-item-cart="'+value.variant_id+'"]').html(value.quantity);
  });
  if (data.order_lines.length === 0) {
    $('[data-item-cart]').html('0');
  }
});
var Compare = new ISnew.Compare({
  //maxItems: 2
});
//EventBus.logger.add('product');
//EventBus.logger.add('cart');
/*
 * Тест для addCartItems()
 */

testAddCartItems = function (items, comments) {
  ISnew.json.addCartItems(items, comments)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}
/*
 * Тест для addCompareItem()
 */

testAddCompareItem = function (item) {
  ISnew.json.addCompareItem(item)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    })
}
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
/*
 * Тест для getClientInfo
 */

testGetClientInfo = function () {
  ISnew.json.getClientInfo()
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}
/*
 * Тест для CollectionGetInfo
 */

// в реальных условиях порядок не filter и pager не важен

testCollectionGetInfo = function (collection, filter, pager) {
  ISnew.json.getCollection(collection, filter, pager)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}
/*
 * Тест для getCompareItems
 */

testGetCompareItems = function () {
  ISnew.json.getCompareItems()
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}
/*
 * Тест для getProduct()
 */

testGetProduct = function (id) {
  ISnew.json.getProduct(id)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
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
/*
 * Тест для makeCheckout()
 */

testMakeCheckout = function (client, order) {
  ISnew.json.makeCheckout(client, order)
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

testRemoveItem = function (id) {
  ISnew.json.removeCartItem(id)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
    });
}
/*
 * Тест для removeCompareItem
 */

testRemoveCompareItem = function (id) {
  ISnew.json.removeCompareItem(id)
    .done(function (response) {
      console.log('done', response);
    })
    .fail(function (response) {
      console.log('fail', response);
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
