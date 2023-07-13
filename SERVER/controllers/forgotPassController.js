const db = require("./../models/sql")();
const path = require("path");
const sendEmail = require("../my_modules/nodemail");

const forgotPassController = {
  getForgotPass: (req, res) => {
    const filePath = path.join(__dirname, "..", "/public/pass/forgot.html");
    res.send({ res: 2 });
  },

  postForgotPass: (req, res) => {
    let email = req.body.email;

    let code = `SELECT * from users WHERE email = '${email}'`;
    db.sqlret(code, function (result) {
      let user = result[0];
      if (!user) {
        return res.end("0");
      } else {
        let token = `t=${user.id}&p=${true}`;
        let mail = `<h3>To reset your paswword,</h3><h3><a href="http://localhost:3000/verify?${token}">Click here</a></h3>`;
        sendEmail(email, mail, function (err, data) {
          return res.send("1");
        });
      }
    });
  },
};

module.exports = forgotPassController;
