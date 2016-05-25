# Шаблоны селекторов

## Обязательные атрибуты

`data-option-bind="<%= option.id %>"` — содержит id опции и на этот атрибут вешается EventListener.<br>
`data-value-position="<%= value.position %>"` — содержит поизицию в дереве вариантов.
`value="<%= value.position %>"` — необходим для select и input[type="radio"].

## Данные доступные в шаблоне

name      | description | property
:-------- |:----------- | :-------
option  | информация о опции  | `handle` — название опции на транслите \. <br> `id` — id опции <br> `position` — позиция в дереве вариантов.<br> `render_type` — id шаблона. <br> `selected` — выбранная в варианте позиция в данной опции <br> `title` — название опции <br> `values` — объект со значениями опции
option.values     | объект со значениями опции | `id` — id значения опции <br> `position` — позиция значения в опции <br> `name` — название значения в lowerCase <br> `option_name_id` — id опции родителя <br> `title` — имя значения опции
images      | объект с картинками продукта | {'белый': {'large_url': 'https://static-eu.insales.ru/**.jpg'}...}
fileUrl    | объект с картинками из файлов | {'белый': {'https://static-eu.insales.ru/**.jpg'}}
initOption | включена ли в настройках утановка первого доступного варианта? | true/false

## Примеры

### Нативный селект

```js
<script type="text/template" data-template-id="option-select">
  <div class="option-<%= option.handle %>">
    <label><%= option.title %></label>
    <select data-option-bind="<%= option.id %>">
      <% _.forEach(option.values, function (value){ %>
        <option
          data-value-position="<%= value.position %>"
          value="<%= value.position %>"
          <% if (option.selected == value.position & initOption) { %>selected<% } %>
        >
          <%= value.title %>
        </option>
      <% }) %>
    </select>
  </div>
</script>
```

### Опции картинками

```js
<script type="text/template" data-template-id="option-image">
  <div class="option-<%= option.handle %>">
    <label><%= option.title %></label>
    <div>
      <% _.forEach(option.values, function (value){ %>
        <span
          data-option-bind="<%= option.id %>"
          data-value-position="<%= value.position %>"
          class="option-image
          <% if (option.selected == value.position & initOption) { %>active<% } %>
          <% if (value.disabled) { %>disabled<% } %>"
        >
          <% if (images[value.name]) { %>
            <img src="<%= images[value.name].small_url %>" alt="<%= value.title %>">
          <% }else{ %>
            <span><%= value.title %></span>
          <% } %>
        </span>
      <% }) %>
    </div>
  </div>
</script>
```

### Опции radio

```js
<script type="text/template" data-template-id="option-checkbox">
  <div class="option-<%= option.handle %>">
    <label><%= option.title %></label>
    <div>
      <% _.forEach(option.values, function (value){ %>
        <input
          type="checkbox"
          name="<%= option.handle %>"
          id="<%= option.handle %>-<%= value.id %>"
          value="<%= value.position %>"
          data-option-bind="<%= option.id %>"
          data-value-position="<%= value.position %>"
          <% if (option.selected == value.position & initOption) { %>checked="checked"<% } %>
          <% if (value.disabled) { %>disabled="disabled"<% } %>"
        >
        <label for="<%= option.handle %>-<%= value.id %>">
          <%= value.title %>
        </label>
      <% }) %>
    </div>
  </div>
</script>
```
### Опции span

```js
<script type="text/template" data-template-id="option-span">
  <div class="option-<%= option.handle %>">
    <label><%= option.title %></label>
    <div>
      <% _.forEach(option.values, function (value){ %>
        <span
          data-option-bind="<%= option.id %>"
          data-value-position="<%= value.position %>"
          class="btn
          <% if (option.selected == value.position & initOption) { %>active<% } %>
          <% if (value.disabled) { %>disabled<% } %>"
        >
            <span><%= value.title %></span>
        </span>
      <% }) %>
    </div>
  </div>
</script>
```