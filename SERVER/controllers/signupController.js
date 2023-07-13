const db = require("./../models/sql")();
const sendEmail = require("../my_modules/nodemail");
const path = require("path");

const signupController = {
  getSignup: (req, res) => {
    if (req.session.is_logged_in) {
      res.send("0");
    } else {
      res.send("1");
    }
  },

  postSignup: (req, res) => {
    const { username, email, pass, newPort } = req.body;
    let id = new Date().getTime();

    db.checkEmailExists(email, function (check) {
      if (check) {
        return res.send("0");
      } else {
        db.createUser(id, username, email, pass, 0, function () {
          let token = `t=${id}&p=${false}`;
          let mail = `<h3>well done,</h3><br><h2>you have create an account to verify</h2><h3><a href="http://localhost:${newPort}/verify?${token}">click here</a></h3>`;
          console.log(mail);
          sendEmail(email, mail, function (err, data) {
            res.send("1");
          });
        });
      }
    });
  },
};

module.exports = signupController;
