const mysql = require('mysql2');


module.exports = function () {
  const con = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'abc@123',
    database: 'node4',
    port: 3306,
  });

  con.connect(function (err) {
    if (err) throw err;
    console.log('Connected!');
  });

  // Function to create a new table
  function sqlwrite(code,callback)  {
    const sql = code;

    con.query(sql, function (err, result) {
      if (err) {throw err}
      else{
        callback();
      }
      
    });
  }

  function sqlret(code,callback) {
    const sql = code;
    con.query(sql, function (err, result) {
      if (err) {throw err}
      else{
        callback(result);
      }
      
    });
  

  }


  /////insert product in products 

function ProdIns(id, name, desc, img, price, cat, stock,callback) {
  let code = `INSERT INTO products (\`id\`, \`name\`, \`description\`, \`image\`, \`price\`, \`category\`, \`stock\`)
VALUES
  ('${id}', '${name}', '${desc}', '${img}', ${price}, '${cat}', ${stock});`;

  sqlwrite(code,function(){

    callback();
  });
}

//ProdIns('p43', 'abc', 'deseds', '3', 24, 'ele', '34');




///// create new user
function createUser(id, name, mail, pass, isVerified,callback) {
  let code = `INSERT INTO \`users\` (\`id\`, \`username\`, \`email\`, \`pass\`, \`isVerified\`)
  VALUES
  ('${id}', '${name}', '${mail}', '${pass}', ${isVerified})`;

  sqlwrite(code,function(){callback()});
}


//////check if email exists
function checkEmailExists(email, callback) {
 
  let code = `SELECT * FROM users WHERE email = '${email}'`;
    sqlret(code,function(result)
    {
     let emailExists=(result.length>0);
     
      callback(emailExists);

    });


}
  

  // Exported object with the table management functions
  return {
    sqlwrite,
    sqlret,
    checkEmailExists,
    ProdIns,
    createUser

  };

};
