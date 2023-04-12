const { generateMainPIN, createPINReloadScript, reloadMessage } = require('../Utils/Utils.js');
const request = require('node-superfetch');

/**
 * import * as express from "express";
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.Express} app 
 */
async function createReceiver(req, res, app) {
  let baseURL = 'https://ehtoauth9u.hisoka17.repl.co';
  let urlPIN = generateMainPIN(21, 'mixed');
  let receiverURL = `proccessAUTH/${urlPIN}`;
  if ((await request.get(receiverURL).ok)) {
    return createReceiver(req, res, app);
  };
  let mainPINAuth = generateMainPIN(req.body.length?req.body.length:6, req.body.type?req.body["type"]:null);
  console.log(receiverURL);
  function createModifiedPath(req, res){
    res.send(createPINReloadScript(mainAuthPIN));
  }
    app.get(`/proccessAUTH/${urlPIN}`, function(req, res) {
      createModifiedPath(req, res);
  });
  setTimeout(()=>{
    createModifiedPath = (req, res) => {
      res.send(reloadMessage)
    }
  }, 20000);
  return { REQUESTURL: receiverURL, AUTHORIZATIONPIN: mainPINAuth };
};

module.exports = createReceiver;
