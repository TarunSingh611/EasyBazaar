const db =require("./../models/sql")()


const loadMoreController = {
postLoadMore: (req, res) => {
    let i=req.body.loaded;

    code=`SELECT * FROM products LIMIT 6 OFFSET ${i};`
    db.sqlret(code, function (products) {
    
          res.send({ products });
    
    });
  }
};

module.exports =loadMoreController;