let authParams = {
  clientEmail: process.env["client_email"],
  clientPass: process.env["client_pass"].replace(/\\n/g, "\n"),
};

module.exports = { authParams };
