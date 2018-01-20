const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../../db/models');
const secret = require('../../config/config').publicKey;

async function signUp(ctx) {
  const { name, password } = ctx.request.body;
  try {
    if (!name || !password) {
      ctx.throw(400, '账号密码均不能为空');
    }
    const encryptPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, password: encryptPassword });
    if (user) {
      ctx.body = {
        message: '注册成功',
      };
    }
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      ctx.throw(400, '用户已存在');
    }
    ctx.throw(500);
  }
}

async function signIn(ctx) {
  const { name, password } = ctx.request.body;
  try {
    const user = await User.findOne({ name });
    if (!user) {
      ctx.throw(401, '用户不存在');
    }
    if (await bcrypt.compare(password, user.password)) {
      const token = jsonwebtoken.sign({
        data: user,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
      }, secret);
      ctx.response.body = {
        message: '登录成功',
        token,
      };
    } else {
      ctx.throw(401, '账号或密码错误');
    }
  } catch (error) {
    ctx.throw(500);
  }
}

module.exports = {
  signUp,
  signIn,
};
