const { generateMainPIN, createPINReloadScript, reloadMessage } = require('../Utils/Utils.js');
const request = require('node-superfetch');

/**
 * import * as express from "express";
 * @param {express.Request} req 
 * @param {express.Response} res 
 * @param {express.Express} app 
 */
async function createReceiver(req, res, app) {
  
    let baseURL = 'https://localhost:3000';
  let urlPIN = generateMainPIN(21, 'mixed');
  let receiverURL = `proccessAUTH/${urlPIN}`;
  let mainURL = `${baseURL}/${receiverURL}`;

  if ((await request.get(`${baseURL}/${receiverURL}`).ok)) {
    return createReceiver(req, res, app);
  };
  let expiry;
  if (req.body.expiration){
    if (isNaN(req.body.expiration)){
      res.json({error: "EXPIRATION VALUE MUST BE A NUMBER", status: 400}).status(400);
    return;
  }
  if (req.body.expiration>300000){
    res.json({error: "EXPIRATION VALUE CANNOT BE MORE THAN 5 MINUTES", status: 400}).status(400);
    return;
  };
  expiry = req.body.expiration;
  } else {expiry = 30000};

  let mainAuthPIN = generateMainPIN(req.body.length?req.body.length:6, req.body.type?req.body["type"]:null);
  function createModifiedPath(req, res){
    res.send(createPINReloadScript(mainAuthPIN, expiry));
  }
    app.get(`/${receiverURL}`, function(req, res) {
      createModifiedPath(req, res);
  });
  setTimeout(()=>{
    createModifiedPath = (req, res) => {
      res.send(reloadMessage)
    }
  }, expiry);
  return { REQUESTURL: mainURL, AUTHORIZATIONPIN: mainAuthPIN };
};

module.exports = createReceiver;
