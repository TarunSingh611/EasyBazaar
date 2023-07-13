const db = require("./../models/sql")();
const multer = require("multer");
const path = require("path");

const adAuth = require("../my_modules/adminAuth");

const folderPath = path.join(__dirname, "..", "files");
const upload = multer({ dest: folderPath }).single("pfp");

const adminAddController = {
  adAuth,

  getAdminAdd: [
    adAuth,
    (req, res) => {
      let user = req.session.user;
      res.send({ res: user });
    },
  ],

  postAdminAdd: [
    adAuth,
    upload,
    (req, res) => {
      let id = new Date().getTime();
      let { name, desc, price, cat, stock } = req.body;

      price = parseFloat(price);
      stock = parseInt(stock);

      if (!name || !desc || !price || !cat || !stock) {
        return res.send("0");
      }

      if (!req.file) {
        return res.send("1");
      }

      let filename = req.file.filename;

      db.ProdIns(id, name, desc, filename, price, cat, stock, () => {
        res.send("2");
      });
    },
  ],
};

module.exports = adminAddController;
