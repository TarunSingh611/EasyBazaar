const db =require("./../models/sql")()
const sendEmail = require("../my_modules/nodemail");
const path =require("path")

const signupController = {
  getSignup: (req, res) => {
      if (req.session.is_logged_in) { res.redirect('/') }
       else {
        res.sendFile(path.join( __dirname,"..","public/signup/index.html"))
   }

   
  },

  postSignup: (req, res) => {
    const { username, email, pass } = req.body;
    let id = new Date().getTime()
  
  
    db.checkEmailExists(email, function(check){
      if(check){return res.send('0');}
      else{
        db.createUser(id,username,email,pass,0,function(){
  
          let token= `t=${id}&p=${false}`
          let mail =`<h3>well done,</h3><br><h2>you have create an account to verify</h2><h3><a href="http://localhost:3000/verify?${token}">click here</a></h3>`
          sendEmail(email,mail,function(err,data){
          res.send('1');})
  
        })
        
      }
    })
  }
};

module.exports = signupController;