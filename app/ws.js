const WebSocket = require('ws');
const uuid = require('uuid/v1');

const wss = new WebSocket.Server({ port: 8080 });
const wssSockets = {};

wss.on('connection', (ws) => {
  ws.id = uuid();
  wssSockets[ws.id] = ws;

  ws.send('something');
  ws.on('message', (message) => {
    console.log('received: %s', message);
  });
  ws.on('close', () => {
    delete wssSockets[ws.id];
  });
});

module.exports = wssSockets;
