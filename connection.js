
const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
    host : "localhost",
    user: "root",
    password: "",
    database: "todo",
    multipleStatements : true
});

mysqlConnection.connect((err)=>{
    if(err){
        console.log("Not Connected");
    }
    else{
        console.log("Connected!");
    }
});

module.exports = mysqlConnection;

