const { sequelize } = require('../../db/models/index');

const User = sequelize.import('../../db/models/user.js');

async function index(ctx) {
  const users = await User.findAll();
  ctx.response.body = users;
}

async function signUp(ctx) {
  const { name, password } = ctx.request.body;
  await User.create({ name, password }).then((res) => {
    ctx.response.body = res;
  });
}

async function signIn(ctx) {
  const { name, password } = ctx.request.body;
  const user = await User.findAll({
    where: {
      name,
    },
  });
  ctx.response.body = user;
}

module.exports = {
  index,
  signUp,
  signIn,
};
