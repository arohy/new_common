var Cart = new ISnew.Cart();
var $cart = $('.js-cart');

Events('update_items:insales:cart').subscribe(function (data) {
  console.log('update_items:insales:cart', data);
});

Events('add_items:insales:cart').subscribe(function (data) {
  console.log('add_items:insales:cart', data);
});

Events('remove_items:insales:cart').subscribe(function (data) {
  console.log('remove_items:insales:cart', data);
});

Events('delete_items:insales:cart').subscribe(function (data) {
  console.log('delete_items:insales:cart', data);
});

Events('set_items:insales:cart').subscribe(function (data) {
  console.log('set_items:insales:cart', data);
});

Events('before:insales:cart').subscribe(function (data) {
  console.log('before:insales:cart', data);
});

Events('always:insales:cart').subscribe(function (data) {
  console.log('always:insales:cart', data);
});
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
var product= new ISnew.Product;

testProduct = function (id) {
  ISnew.json.getProduct(id)
    .done(function (response) {
      product.init(response.product);
      console.log('done');
    });
};