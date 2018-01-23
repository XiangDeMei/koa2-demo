const Router = require('koa-router');
const {
  UsersController,
  MerchantsController,
} = require('./controller/index');

const router = new Router({
  prefix: '/api/v1',
});

const user = new Router();
user
  .post('/sign_up', UsersController.signUp)
  .post('/sign_in', UsersController.signIn);

const merchant = new Router();
merchant
  .get('/', MerchantsController.index)
  .post('/', MerchantsController.create)
  .get('/:id', MerchantsController.read)
  .post('/:id/renew', MerchantsController.reNew)
  .get('/:id/records', MerchantsController.readRecords);

router
  .use('/users', user.routes())
  .use('/merchants', merchant.routes());

module.exports = router;
