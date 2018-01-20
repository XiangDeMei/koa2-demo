const Router = require('koa-router');
const controller = require('./controller/index');

const router = new Router();

router
  .post('/api/v1/users/sign_up', controller.UsersController.signUp)
  .post('/api/v1/users/sign_in', controller.UsersController.signIn)
  .get('/api/v1/merchants', controller.MerchantsController.index)
  .post('/api/v1/merchants', controller.MerchantsController.create)
  .get('/api/v1/merchants/:id', controller.MerchantsController.read)
  .post('/api/v1/merchants/:id/renew', controller.MerchantsController.reNew)
  .get('/api/v1/merchants/:id/records', controller.MerchantsController.readRecords);

module.exports = router;
