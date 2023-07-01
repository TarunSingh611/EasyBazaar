const path= require('path')

function chkAuth(req,res,next){

  if(req.session && req.session.is_logged_in && req.session.user.isVerified){
    next()
    return
  }
  else if(req.session && req.session.is_logged_in && !req.session.user.isVerified){
    res.send("NOT VERIFIED")
    return
  }
  res.sendFile(path.join(__dirname,"/..","/public/login/index.html"));
}
module.exports=chkAuth;