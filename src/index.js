const http = require('http');
const config = require('./config')();
const app = require('./app');

// TODO refactor to dynamic reading
config.routes = [
  { methods: ['post', 'get'], path: '/hello', service: 'http://dockerhost:3001/', auth: false },
];

http.createServer(app(config)).listen(config.port);
