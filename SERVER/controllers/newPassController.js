const db =require("./../models/sql")()
const path = require('path'); 

const newPassController = {
  getNewPass: (req, res) => {  if(req.session.changePass){
    const filePath = path.join(__dirname, '..', '/public/pass/newPass.html');
    res.sendFile(filePath);
}
    else{
      res.render("/")
    }
  },

  postNewPass: (req, res) => {
    if(req.body.newpass){

      let code = `UPDATE users SET pass = \'${req.body.newpass}\' WHERE id = '${req.session.user.id}'`
      db.sqlwrite(code,function(){
        req.session.changePass=false
        req.session.user.pass=req.body.newpass;
        return res.redirect("/")
      })
    }  
    else
    {
      return
    }
  }
};

module.exports = newPassController;