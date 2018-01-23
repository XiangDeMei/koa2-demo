const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { User } = require('../../db/models');
const secret = require('../../config/config').publicKey;

const ADMIN_USER = ['admin'];

async function signUp(ctx) {
  const { name, password } = ctx.request.body;
  if (!name || !password) {
    ctx.throw(400, '账号密码均不能为空');
  }
  const encryptPassword = await bcrypt.hash(password, 10);
  const user = await User.create({ name, password: encryptPassword });
  if (user) {
    ctx.body = {
      message: '注册成功',
    };
  } else {
    ctx.throw(400, '用户已存在');
  }
}

async function signIn(ctx) {
  const { name, password } = ctx.request.body;
  const user = await User.findOne({ where: { name } });
  if (!user) {
    ctx.throw(400, '用户不存在');
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jsonwebtoken.sign({
      data: user,
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60),
    }, secret);
    // 用户权限
    if (ADMIN_USER.includes(name)) {
      ctx.response.body = {
        message: '登录成功',
        authority: 'admin',
        token,
      };
    } else {
      ctx.response.body = {
        message: '登录成功',
        authority: 'user',
        token,
      };
    }
  } else {
    ctx.throw(400, '账号或密码错误');
  }
}

module.exports = {
  signUp,
  signIn,
};
