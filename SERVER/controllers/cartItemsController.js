const db = require("./../models/sql")();

const cartItemsController = {
  getCartItems: (req, res) => {
    let userId = req.session.user.id;

    code = `SELECT * FROM cart
    INNER JOIN products ON cart.productId = products.id
    WHERE cart.userId = ${userId};`;

    db.sqlret(code, function (cartItems) {
      res.send(JSON.stringify({ cartItems }));
    });
  },

  postCartItem: (req, res) => {
    const data = req.body;

    let code = `UPDATE cart SET Qn = '${data.Qn}' WHERE cartId =${data.id}`;
    db.sqlwrite(code, function (result) {
      res.send();
    });
  },
};

module.exports = cartItemsController;
