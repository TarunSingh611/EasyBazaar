const db =require("./../models/sql")()
const cartAuth = require("../my_modules/cartAuth");
const cartAuthController = {
postCartAuth:[
  cartAuth,
   (req, res) => {  let userId=req.session.user.id
    let itemid=req.body.itemId
  
    
    db.sqlret(`SELECT * FROM cart where userId='${userId}' AND productId='${itemid}'`, function (cart) {
   
    
      // Add item to cart
     
      if (cart.length>0) {
        return res.send("1");
      } else {
        res.send("2");
    
    }
    })
   
  }]
};

module.exports = cartAuthController;



  
