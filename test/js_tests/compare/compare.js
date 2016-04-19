var Compare = new ISnew.Compare({
  maxItems: 2
});

Events('init:insales:compares').subscribe(function (data) {
  console.log('init:insales:compares', data);
});

Events('update_items:insales:compares').subscribe(function (data) {
  console.log('update_items:insales:compares', data);
});

Events('add_item:insales:compares').subscribe(function (data) {
  console.log('add_item:insales:compares', data);
});

Events('remove_item:insales:compares').subscribe(function (data) {
  console.log('remove_item:insales:compares', data);
});

Events('overload:insales:compares').subscribe(function (data) {
  console.log('overload:insales:compares', data);
});