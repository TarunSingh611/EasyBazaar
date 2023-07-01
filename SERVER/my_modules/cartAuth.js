function cartAuth(req,res,next){
  if(req.session.is_logged_in && req.session.user.isVerified){
    next()
    return
  }
  else if(req.session.is_logged_in && !req.session.user.isVerified){
    res.send("NOT VERIFIED")
    return
  }
  res.send("0");
}
module.exports=cartAuth;