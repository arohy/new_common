# Удаление товара из сравнения

`removeCompareItem( id )`

Удаляет товар с указанным id из списка

````javascript
ISnew.json.removeCompareItem(id)
  .done(function (response) {
    console.log('done', response);
  })
  .fail(function (response) {
    console.log('fail', response);
  });
````

Отевет всегда

````javascript
{
  status: 'ok'
}
````