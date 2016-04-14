# Получение информации о коллекции

`getCollection(handle[, filter] [, pager])`

* `handle` - пермалинк коллекции, обязателен.
* `filter` - объект с выбранными параметрами для фильтрации.
* `pager` - объект с настройками пагинации.

## Пример

````javascript
var filter = {
  price_min: 4000,
  price_max: 10000
};
var pager = {
  page_size: 25,
  page: 2
}

ISnew.json.CollectionGetInfo('collection_handle', filter, pager)
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  })
````

## Ответ

В ответ приходит json вида

````javascript
{
  status: "ok",
  count: 19, // кол-во товаров, подошедшие под заданный filter
  products: [
    // массив товаров, с указанной страницы с применением разбивки
    // либо первые 100 товаров в коллекции
  ]
}
````