const path = require("path");

function chkAuth(req, res, next) {
  if (req.session && req.session.is_logged_in && req.session.user.isVerified) {
    next();
    return;
  } else if (
    req.session &&
    req.session.is_logged_in &&
    !req.session.user.isVerified
  ) {
    res.send({ res: 0 });
    return;
  }
  res.send({ res: 1 });
}
module.exports = chkAuth;
