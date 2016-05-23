# Живой поиск

## Обязательные теги и атрибуты

### Атрибуты
`data-search-field` — атрибут для поля ввода <br>
`data-search-wrapper` — атрибут для контейнера куда будет происходить рендер результата <br>

### Теги
`form>(input[data-search-field]+div[data-search-wrapper])` — теги `form`, `input[data-search-field]`, `div[data-search-wrapper]`

## liquid

```liquid
<form action="/search" method="get">
  <input type="text" name="q" value="{{ search.query | escape }}" placeholder="Поиск" data-search-field/>
  <button type="submit">Поиск</button>
  <div data-search-wrapper></div>
</form>
```

## Event

#### EventName
`update_suggestions:insales:search` — срабатывает после ajax запроса и после клика по любому месту документа

#### update_suggestions:insales:search
В данный подписчик прилетает объект содержащий в себе:

`action` - содержит свойство `method` и `input`<br>
`suggestions` — ответ сервера

## Пример шаблона

```html
<script type="text/template" data-template-id="ajax-search">
  <% if (suggestions.length > 0){ %>
    <ul class="ajax_search-results">
      <% _.forEach(suggestions, function (product){ %>
        <li class="ajax_search-item">
          <a href="<%- product.url %>" class="ajax_search-link">
            <%= product.marked_title %>
            <span class="ajax_search-prices">
              <%= money.format( product.fields.price_min ) %>
            </span>
          </a>
        </li>
      <% }) %>
    </ul>
  <% } %>
</script>
```

## Обновление настроек

```js
$(function() {
  AjaxSearch.setConfig({
    template: 'ajax-search',
    letters: 3
  })
});
```