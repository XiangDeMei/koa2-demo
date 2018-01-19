const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const errorHandler = require('./middleware/error');

const router = require('./router');

const app = new Koa();

app
  .use(errorHandler)
  .use(logger())
  .use(jwt({
    secret,
  }).unless({
    path: [/\/register/, /\/login/],
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);

console.log('server is starting at http://127.0.0.1:3000');
