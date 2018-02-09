const Koa = require('koa');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt');
const cors = require('koa2-cors');
const errorHandler = require('./middleware/error');
const router = require('./router');
const secret = require('../config/config').publicKey;
const httpProxy = require('http-proxy');

const proxy = httpProxy.createProxyServer();
const app = new Koa();

app
  .use((ctx, next) => {
    const reg = /^\/api\/v1\/image/;
    if (reg.test(ctx.req.url)) {
      ctx.response = false;
      proxy.web(ctx.req, ctx.res, { target: 'http://127.0.0.1:4000' });
    } else {
      next();
    }
  })
  .use(cors({ credentials: true }))
  .use(errorHandler)
  .use(logger())
  .use(jwt({ secret }).unless({
    path: [/\/api\/v1\/users\/sign_up/, /\/api\/v1\/users\/sign_in/],
  }))
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log('server is starting at http://127.0.0.1:3000');
});

