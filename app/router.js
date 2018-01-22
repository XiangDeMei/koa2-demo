const Router = require('koa-router');
const controller = require('./controller/index');

const router = new Router({
  prefix: '/api/v1',
});

router
  .post('/users/sign_up', controller.UsersController.signUp)
  .post('/users/sign_in', controller.UsersController.signIn)
  .get('/merchants', controller.MerchantsController.index)
  .post('/merchants', controller.MerchantsController.create)
  .get('/merchants/:id', controller.MerchantsController.read)
  .post('/merchants/:id/renew', controller.MerchantsController.reNew)
  .get('/merchants/:id/records', controller.MerchantsController.readRecords);

module.exports = router;
