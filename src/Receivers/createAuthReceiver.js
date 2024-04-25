const {
  generateMainPIN,
  createPINReloadScript,
  reloadMessage,
  validate,
} = require("../Utils/Utils.js");
const MailHandler = require("../Mail/MailHandler.js");
const request = require("node-superfetch");
const bodyParser = require("body-parser");

/**
 * import * as express from "express";
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.Express} app
 */
async function createReceiver(req, res, app) {
  let baseURL =
    "https://c1f3f659-dc1d-43cf-930d-02adcdecf907-00-3t4y9kwrdc0fx.janeway.replit.dev/";
  let urlPIN = generateMainPIN(21, "mixed");
  let receiverURL = `proccessAUTH/${urlPIN}`;
  let mainURL = `${baseURL}/${receiverURL}`;
  let callbackURL = `${baseURL}/${receiverURL}/authorize_user`;

  if (await request.get(`${baseURL}/${receiverURL}`).ok) {
    return createReceiver(req, res, app);
  }
  let expiry;
  if (!req.body.email) {
    res
      .json({
        error: "CLIENT EMAIL NOT FOUND",
        status: "400 BAD REQUEST",
      })
      .status(400);
    return;
  }
  if (!validate(req.body.email)) {
    res
      .json({
        error: "INVALID EMAIL",
        status: "400 BAD REQUEST",
      })
      .status(400);
    return;
  }
  if (req.body.expiration) {
    if (isNaN(req.body.expiration)) {
      res
        .json({
          error: "EXPIRATION VALUE MUST BE A NUMBER",
          status: "400 BAD REQUEST",
        })
        .status(400);
      return;
    }
    if (req.body.expiration > 300000) {
      res
        .json({
          error: "EXPIRATION VALUE CANNOT BE MORE THAN 5 MINUTES",
          status: "400 BAD REQUEST",
        })
        .status(400);
      return;
    }
    expiry = req.body.expiration;
  } else {
    expiry = 30000;
  }
  let mail = new MailHandler(req.body.email);

  let mainAuthPIN = generateMainPIN(
    req.body.length ? req.body.length : 6,
    req.body.type ? req.body["type"] : null,
  );
  function createModifiedPath(req, res) {
    res.send(createPINReloadScript(mainAuthPIN, expiry, callbackURL));
  }
  app.get(`/${receiverURL}`, function (req, res) {
    createModifiedPath(req, res);
  });
  setTimeout(() => {
    createModifiedPath = (req, res) => {
      res.send(reloadMessage);
    };
  }, expiry);
  mail.initialize();
  mail
    .sendMail({
      subject: "YOUR AUTHORIZATION CODE",
      message: `Please click open [This Link](${mainURL}) | And enter the following PIN: ${mainAuthPIN}`,
    })
    .then(({ status }) => {
      let oauth;
      if (status === 200) {
        app.post(
          `/${receiverURL}/authorize_user`,
          bodyParser.json(),
          function (req, res) {
            if (req.body.auth_pin) {
              oauth = req.body.auth_pin === mainAuthPIN ? true : false;
            } else {
              oauth = false;
            }
          },
        );
      } else {
        oauth = false;
      }
    });
  return { oauth_state: oauth };
}

module.exports = createReceiver;
