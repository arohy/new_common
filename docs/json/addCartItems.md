# Добавление товара

`addCartItems(id_list[, comments])`,

* `id_list` - объект, состоящий из пар id варианта модификации и добавляемого кол-ва.
* `comments` - объект, состящий из пар id варианта модификации и комментария

Пример.

````javascript
var items = {
  123456: 1,
  123457: 3,
  123450: 100
};

var comments = {
  123456: 'А вот и наш комментарий'
};

ISnew.json.addCartItems(items, comments)
  .done(function (response) {
    console.log(response);
  })
  .fail(function (response) {
    console.log('что-то пошло не так!! ', response);
  });
````

Ответ - **нужно уточнить**