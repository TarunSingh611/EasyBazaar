const db = require('./../models/sql')();

const verifyEmailController = {
  getVerifyEmail: (req, res) => {
    const token = req.query.t;
    const pass = req.query.p;
    let code = `UPDATE users SET isVerified = 1 WHERE id = '${token}'`;

    db.sqlwrite(code, function () {
      let code2 = `SELECT * from users WHERE id = '${token}'`;
      db.sqlret(code2, function (user) {
        req.session.user = user[0];
        req.session.is_logged_in = true;

        if (pass === 'true') {
          req.session.changePass = true;
          return res.redirect('/newPass');
        }

        res.redirect('/');
      });
    });
  }
};

module.exports = verifyEmailController;
