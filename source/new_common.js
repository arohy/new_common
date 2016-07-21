console.warn('Внимание подключена новая версия JS API InSales');

/** @global */
window._ = require('lodash');

/** @global */
window.ajaxAPI = require('./json/ajax');
/** @global */
window.Template = require('./template/template');
/** @global */
window.EventBus = require('./events/events');

/** @global */
window.Shop = require('./shop/shop');
/** @global */
window.Cart = require('./cart/cart');
/** @global */
window.Compare = require('./compare/compare');
/** @global */
window.Products = require('./products/products');
/** @global */
window.AjaxSearch = require('./search/search');

/** @global */
window.Site = {};