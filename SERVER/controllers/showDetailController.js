const db =require("./../models/sql")()

const showDetailController = {
postShowDetail: (req, res) => {
    const id =req.body.id;
  
  
  code=`SELECT * from products where id ='${id}';`
  db.sqlret(code,function(result){
    res.send(JSON.stringify({"prod":result}));
  })
   
  }
};

module.exports = showDetailController;