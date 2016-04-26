EventBus.subscribe('test', function(data) {
  //console.log('function 1:', data);
});

EventBus.publish('test', {test: 'ready'});
EventBus.publish('test', {test: 'ready2'});

EventBus.subscribe('test', function(data) {
  //console.log('function 2:', data);
});

EventBus.subscribe('test2', function(data) {
  //console.log('function 3:', data);
});

EventBus.publish('test2', {teeee: 'teeeeeepooooooot'});