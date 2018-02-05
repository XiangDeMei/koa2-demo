const Koa = require('koa');
const rds = require('../config/redis');

const app = new Koa();
const server = require('http').createServer(app.callback());
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  const { user } = socket.handshake.query;
  try {
    rds.sadd(user, socket.id);
  } catch (err) {
    console.log(err);
  }

  /* eslint no-shadow: */
  socket.on('disconnect', () => {
    const { user } = socket.handshake.query;
    rds.srem(user, socket.id);
  });
});

server.listen(3001);

module.exports = io;


/*
  socket.io 单用户多设备推送
  同一用户的 socket.id 使用 redis set 存储
  ex: 用户名为 qwqe
*/
