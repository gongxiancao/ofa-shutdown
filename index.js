function lift () {
  var self = this;
  if(self.config.beforeShutdown) {
    process.on('SIGINT', function() {
      self.log.info('Shutting down...');
      self.config.beforeShutdown(function (err) {
        self.log.info('Shutted down...');
        self.lower()
          .on('lowered', function () {
            process.exit(err ? 1 : 0);
          });
      });
    });
  }
  return new Promise(function (resolve) {
    resolve();
  });
};

module.exports = lift;
