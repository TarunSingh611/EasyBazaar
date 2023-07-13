function adminAuth(req, res, next) {
  if (
    req.session.is_logged_in &&
    req.session.user.isVerified &&
    req.session.user.isAdmin
  ) {
    next();
    return;
  } else if (req.session.is_logged_in && !req.session.user.isAdmin) {
    res.send({ res: 1 });
    return;
  }
  res.send({ res: 1 });
}
module.exports = adminAuth;
