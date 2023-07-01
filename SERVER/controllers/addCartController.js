const db =require("./../models/sql")()
const chkAuth = require("../my_modules/chkAuth");

const addCartController = {
postAddCart :[
  chkAuth,
  (req, res)=> {
    let itemid = req.body.itemId;
    let Qn = req.body.no;
    let userId = req.session.user.id;
  
    // Query the database to retrieve the cart data
    db.sqlret(`SELECT * FROM cart where userId='${userId}' AND productId='${itemid}'`, function (cart) {
      // Add item to cart
  
  
      if (cart.length>1) {
        return res.send("Item already in Cart!!");
      } else {
        let code = `insert into cart(userId,productId,Qn) values(${userId},'${itemid}',${Qn});`;
        db.sqlwrite(code, function(result) {
          res.send("Added to cart");
        });
    }
  
  
      
    });
  }]
};

module.exports = addCartController;
