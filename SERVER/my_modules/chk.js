function chk(options) {
  return function (req, res, next) {
    // console.log(req.session);
    // const cookies = req.cookies;
    // console.log(cookies);
    next();
  };
}

module.exports = chk;
