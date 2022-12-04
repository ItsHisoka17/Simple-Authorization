const { generateMainPIN, createPINReloadScript } = require('../Utils/Utils.js');
const request = require('node-superfetch');

async function createReceiver(req, res, app) {
  let baseURL = 'https://ehtoauth9u.hisoka17.repl.co';
  let urlPIN = generateMainPIN(21);
  let receiverURL = `${baseURL}/proccessAUTH/${urlPIN}`;
  if ((await request.get(receiverURL).ok)) {
    return createReceiver(req, res, app);
  };
  let mainPINAuth = generateMainPIN(6);
  console.log(receiverURL);
  function createModifiedPath(req, res){
    res.send(createPINReloadScript(mainAuthPIN));
  }
    app.get(`/proccessAUTH/${urlPIN}`, function(req, res) {
      createModifiedPath(req, res);
  });
  setTimeout(()=>{
    createModifiedPath = (req, res) => {
      res.send('<p style="font-size: 40px">EXPIRED URL</p>')
    }
  }, 20000);
  return { REQUESTURL: receiverURL, AUTHORIZATIONPIN: mainPINAuth };
};

module.exports = createReceiver;