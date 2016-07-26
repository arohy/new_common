console.warn('Внимание подключена новая версия JS API InSales');

window._ = require('lodash');

window.ajaxAPI = require('./ajax/ajax');
window.Template = require('./template/template');
window.EventBus = require('./events/events');

window.Shop = require('./shop/shop');
window.Cart = require('./cart/cart');
window.Compare = require('./compare/compare');
window.Products = require('./products/products');
window.AjaxSearch = require('./search/search');

window.Site = {};