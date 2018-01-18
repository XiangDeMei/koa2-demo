const Router = require('koa-router');
const controller = require('./controller/index');

const router = new Router();

router
  .get('/users', controller.UsersController.index)
  .post('/users/sign_up', controller.UsersController.signUp)
  .post('/users/sign_in', controller.UsersController.signIn);

module.exports = router;
