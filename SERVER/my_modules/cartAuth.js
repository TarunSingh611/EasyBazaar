function cartAuth(req, res, next) {
  if (req.session.is_logged_in && req.session.user.isVerified) {
    next();
    return;
  } else if (req.session.is_logged_in && !req.session.user.isVerified) {
    res.send("1");
    return;
  }
  res.send("0");
}
module.exports = cartAuth;
