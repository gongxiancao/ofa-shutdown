function invokeCallback(done) {
  process.nextTick(done);
}
function lift () {
  var self = this;
  var beforeShutdown = self.config.beforeShutdown || invokeCallback;
  process.on('SIGINT', function() {
    self.log.info('Shutting down...');
    var startTime = new Date();
    beforeShutdown(function (err) {
      self.log.info('Shutted down...(in ' + (new Date() - startTime) + 'ms)');
      self.lower()
        .on('lowered', function () {
          process.exit(err ? 1 : 0);
        });
    });
  });

  return new Promise(function (resolve) {
    resolve();
  });
};

module.exports = lift;
