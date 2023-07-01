
const path = require('path'); 
const chkAuth = require("../my_modules/chkAuth");
const changePassController = {
  getChangePass: [chkAuth,
    (req, res) => {
  const filePath = path.join(__dirname, '..', '/public/pass/changePass.html');
  res.sendFile(filePath);
   
  }],

  postChangePass: [
    chkAuth,
    (req, res) => {
if(req.body.currpass==req.session.user.pass){
    req.session.changePass=true
    res.send("1")
  }else{
    res.send("0")
  }
  }]
};

module.exports = changePassController;