# Получение информации о товаре

`getProduct( id )`,

где id - id товара.

В ответе приходит json продукта со всей информацией о товаре.

Пример.

````javascript
ISnew.json.getProduct(123456)
  .done(function (response) {
    console.log(response);
  })
  .fail(function (response) {
    console.log('что-то пошло не так!! ', response);
  });
````