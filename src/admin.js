// app that handles admin requests

const serverRouter = require('server-router');
const fromString = require('from2-string');

const fromJson = function (obj) {
  return fromString(JSON.stringify(obj));
};

module.exports = function (config) {

  const admin = serverRouter('/404');
  const gateway = config.gateway;

  admin.on('/404', (req, res) => {
    res.statusCode = 404;
    return fromJson({ type: 'error', message: 'Not found' });
  });

  admin.on('/', (req, res, params) => {
    return fromString('Hello admin!');
  });

  admin.on('/route', {
    get: (req, res, params) => {
      return fromString('all routes');
    },

    post: (req, res, params) => {
      // const route = gateway.addRoute(req.body);
      return fromJson({});
    },

    delete: (req, res, params) => {
      return fromString('delete route');
    },
  });

  return admin;
};
