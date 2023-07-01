const db =require("./../models/sql")()
const adAuth = require("../my_modules/adminAuth");

const deleteProductController = {
 postDeleteProduct: [adAuth,
  (req, res) => {
    const id = req.body.id;
    const productDeleteQuery = `DELETE FROM products WHERE id = '${id}'`;
    const cartDeleteQuery = `DELETE FROM cart WHERE productId = '${id}'`;
    
    db.sqlwrite(productDeleteQuery, function(error, result) {
      if (error) {
        console.error("Error deleting product:", error);
        res.status(500).send("An error occurred while deleting the product.");
        return;
      }
    
      db.sqlwrite(cartDeleteQuery, function(error, result) {
        if (error) {
          console.error("Error deleting cart entries:", error);
          res.status(500).send("An error occurred while deleting cart entries.");
          return;
        }
    
        res.send("Product and associated cart entries have been successfully deleted.");
      });
    });
  }
 ]
  
};

module.exports = deleteProductController;



  
