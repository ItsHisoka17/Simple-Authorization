const server = require('express')();
const createReceiver = require('./Receivers/createAuthReceiver.js');

server.post('/requestAuthorizationPRS', (req, res) => {
  return createReceiver(req, res, server)
    .then(function(result) {
      return res.send(result).status(200);
    }).catch((e) => { return res.json({ error: 'UNKNOWN INTERNAL SERVER ERROR' }).status(500) });
});

module.exports = server;