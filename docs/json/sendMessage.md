## Отпаравка сообщений

`sendMessage(options)`

options - объект с полями:

* `feedback[content]` - тело сообщения. **Обязательно**
* `feedback[from]` - e-mail, с которого "отправлено" сообщение. **Обязательно**
* `feedback[phone]` - телефон, указывается в теле письма. По-умолчанию - пустое
* `feedback[name]` - имя, указывается в теле письма. По-умолчанию - пустое.
* `feedback[subject]` - тема письма.

**нужно полуркать, какие еще есть поля!!!**

`.done()` срабатывает, если письмо ушло нормально и нет никаких ошибок.

`.fail()` срабатывает, если какие-то поля не заполнены или содержат ошибки

Приложить пример ответа с ошибками.

Пример.
````javascript
ISnew.json.sendMessage({
  'feedback[from]': 'json@test.ru',
  'feedback[name]': 'test is my name',
  'feedback[subject]': 'test is my subject',
  'feedback[content]': 'YAAAAR!!!!',
  'feedback[phone]': '+00000000000000'
})
  .done(function(response) {
    console.log(response);
  })
  .fail(function(response) {
    console.log('что-то пошло не так!! ', response);
  });
````

**Важно**

Посмотреть, какие тут есть подводные камни - точно не помню!!!