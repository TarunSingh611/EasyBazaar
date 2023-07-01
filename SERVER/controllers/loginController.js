const db =require("./../models/sql")()
const path =require("path")

const loginController = {

  getLogin: (req, res) => {


    
  if (req.session && req.session.is_logged_in) { 

    res.redirect('/') }
     else {

    res.sendFile(path.join( __dirname,"..","public/login/index.html"))
  }
   
  },

  postLogin: (req, res) => {
    const { email, pass } = req.body;
 
    
      let code = `SELECT * from users WHERE email = '${email}'`
      db.sqlret(code,function(result){
      let user=result[0]
      if (!user) {
        return res.end('0');
    } else if (user.pass !== pass) {
        return res.end('1');
    }else if(user.isVerified){
          // Login successful
          req.session.is_logged_in = true
          req.session.user=user
          return res.end('2');
    }
    else{
      return res.end('3')
    }
      })
  }
};

module.exports = loginController;