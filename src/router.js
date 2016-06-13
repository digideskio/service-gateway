module.exports = function () {
  const serverRouter = require('server-router');
  const request = require('hyperquest');

  const allMethods = [
    'get',
    'post',
    'put',
    'delete',
    'patch',
    'head',
    'options',
  ];

  const proxy = function (route) {
    return function (req, res, params) {
      const options = {
        method: req.method,
        uri: route.service,
      };
      const r = request(options);
      r.on('error', (err) => res.end('ERR'));
      r.pipe(res);
    };
  };

  const router = serverRouter('/404'); //, { wrap: wrapper() });

  router.addRoute = function (route) {
    const options = {};
    const methods = route.methods || allMethods;
    methods.forEach((method)=> {
      options[method] = proxy(route);
    });
    router.on(route.path, options);
  };

  router.on('/404', function (req, res) {
    res.statusCode = 404;
    return res.end('Not found');
  });

  return router;
};
