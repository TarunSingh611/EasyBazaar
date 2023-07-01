const db = require("../models/sql")();

const adAuth = require("../my_modules/adminAuth");

const adminController = {
  getAdmin: [
    adAuth, 
    (req, res) => {
      let user = req.session.user;
      res.send({ user });
    }
  ],

  postAdmin: [
    adAuth, 
    (req, res) => {
      let data = req.body;

      const id = data.id;
      const name = data.name;
      const description = data.description;
      const category = data.category;
      const price = parseFloat(data.price);
      const stock = parseInt(data.stock);

      const code = `UPDATE products
        SET name = '${name}',
        description = '${description}',
        category = '${category}',
        price = ${price},
        stock = ${stock}
        WHERE id = '${id}';`;

      db.sqlwrite(code, function () {
        res.send();
      });
    }
  ]
};

module.exports = adminController;
