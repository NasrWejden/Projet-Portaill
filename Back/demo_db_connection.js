'use strict';
var mysql = require('mysql');

const connectionDB = function(){

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"erp-test"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });
  return con;
}


module.exports = {
  connectionDB
};