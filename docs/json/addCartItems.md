## Добавление товара

`addCartItems( id_list )`,

где `id_list` - объект, состоящий из пар id варианта модификации и добавляемого кол-ва.

Ответ - **нужно уточнить**

Пример.
````javascript
ISnew.json.addCartItems({ 123456: 1; 123457: 3; 123450: 100 })
  .done(function(response) {
    console.log(response);
  })
  .fail(function(response) {
    console.log('что-то пошло не так!! ', response);
  });
````