## Удаление товара

`removeCartItem( variant_id )`

`variant_id` - id удаляемой позиции

Ответ - **нужно уточнить**

Пример.
````javascript
ISnew.json.removeCartItem (123456)
  .done(function (response) {
    console.log(response);
  })
  .fail(function (response) {
    console.log('что-то пошло не так!! ', response);
  });
````
