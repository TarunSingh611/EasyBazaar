const db =require("./../models/sql")()

const chkAuth = require("../my_modules/chkAuth");
const cartController = {

  getCart: [chkAuth,
    (req, res) => {
      
    let user=req.session.user

    res.send({user})
   
  }],

  postCart:[chkAuth,
     (req, res) => {const id=req.body.id

    code=`delete from cart where cartId=${id};`
    db.sqlwrite(code,function(result){
      res.end();
    })
  }]
};

module.exports = cartController;



  
