function lift () {
  var self = this;
  if(self.config.beforeShutdown) {
    process.on('SIGINT', function() {
      self.config.beforeShutdown(function (err) {
        process.exit(err ? 1 : 0);
      });
    });
  }
  return new Promise(function (resolve) {
    resolve();
  });
};

module.exports = lift;
