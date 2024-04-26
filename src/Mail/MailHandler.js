const { google, gmail_v1 } = require("googleapis");
const { authParams } = require("./RequestParams.js");

class MailHandler {
  constructor(recepient) {
    this.target = recepient;
  }
  async initialize() {
    try {
      let jwt = new google.auth.JWT(
        authParams.clientEmail,
        authParams.clientPass,
        ["https://www.googleapis.com/auth/gmail.send"],
        this.target,
      );
      await jwt.authorize();
      this.client = new google.gmail({ version: "v1", jwt });
      console.log({
        message: "Initilization Successful",
        status: 200,
      });
    } catch (e) {
      console.log({
        message: "Initilization Failed",
        error: e,
        status: 500,
      });
    }
  }
  async sendMail({ subject, message }) {
    let encodedSubject, mimeMessage, raw;
    encodedSubject = `=?utf-8?B?${Buffer.from(subject, "utf-8").toString("base64")}?=`;

    mimeMessage = `From: ${authParams.clientEmail}\r\nTo: ${this.recepient}\r\nSubject: ${encodedSubject}\r\nContent-Type: text/plain; charset=UTF-8\r\n\r\n${message}`;

    raw = Buffer.from(mimeMessage, "utf-8")
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    try {
      this.client.users.messages
        .send({
          userId: "me",
          requestBody: { raw },
        })
        .then(function (res) {
          console.log({
            message: "Message Sent",
            status: 200,
          });
        });
    } catch (e) {
      console.log({
        message: "Error Sending Mail",
        error: e,
        status: 500,
      });
    }
  }
}
module.exports = MailHandler;
