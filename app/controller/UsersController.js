const { User } = require('../../db/models');

async function signUp(ctx) {
  const { name, password } = ctx.request.body;
  console.log(name, password);
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
  signUp,
  signIn,
};
