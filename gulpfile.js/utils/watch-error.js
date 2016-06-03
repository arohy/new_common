module.exports = {
  watchError: function(err) {
    console.log(err);
    this.emit('end');
  }
}