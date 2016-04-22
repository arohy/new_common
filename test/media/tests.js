var Cart = new ISnew.Cart();
var $cart = $('.js-cart');

EventBus.subscribe('update_items:insales:cart', function (data) {
  console.log('update_items:insales:cart', data);
});

EventBus.subscribe('add_items:insales:cart', function (data) {
  console.log('add_items:insales:cart', data);
});

EventBus.subscribe('remove_items:insales:cart', function (data) {
  console.log('remove_items:insales:cart', data);
});

EventBus.subscribe('delete_items:insales:cart', function (data) {
  console.log('delete_items:insales:cart', data);
});

EventBus.subscribe('set_items:insales:cart', function (data) {
  console.log('set_items:insales:cart', data);
});

EventBus.subscribe('before:insales:cart', function (data) {
  console.log('before:insales:cart', data);
});

EventBus.subscribe('always:insales:cart', function (data) {
  console.log('always:insales:cart', data);
});
var Compare = new ISnew.Compare({
  maxItems: 2
});

EventBus.subscribe('init:insales:compares', function (data) {
  console.log('init:insales:compares', data);
});

EventBus.subscribe('update_items:insales:compares', function (data) {
  console.log('update_items:insales:compares', data);
});

EventBus.subscribe('add_item:insales:compares', function (data) {
  console.log('add_item:insales:compares', data);
});

EventBus.subscribe('remove_item:insales:compares', function (data) {
  console.log('remove_item:insales:compares', data);
});

EventBus.subscribe('overload:insales:compares', function (data) {
  console.log('overload:insales:compares', data);
});
EventBus.subscribe('test', function(data) {
  console.log('function 1:', data);
});

EventBus.publish('test', {test: 'ready'});
EventBus.publish('test', {test: 'ready2'});

EventBus.subscribe('test', function(data) {
  console.log('function 2:', data);
});

EventBus.subscribe('test2', function(data) {
  console.log('function 3:', data);
});

EventBus.publish('test2', {teeee: 'teeeeeepooooooot'});
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
var product;

EventBus.subscribe('update_price:insales:product', function (data) {
  console.log('update_price:insales:product', data);
});

EventBus.subscribe('update_variant:insales:product', function (data) {
  console.log('update_variant:insales:product', data);
});