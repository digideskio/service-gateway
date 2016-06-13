module.exports = function (config) {
  const router = require('./router')(config);
  const adminRouter = require('./admin')({
    gateway: router,
  });

  router.on('/_admin', adminRouter);
  config.routes.forEach(router.addRoute);

  return router;
};
