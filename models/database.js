const mysql=require('mysql');

const mysqlConnection=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"employee",
    password: "61746951"
});

mysqlConnection.connect(function (err) {
    if (err) {
        console.log("Error in the connection")
        console.log(err)
    }
    else {
        console.log(`Database Connected`);
    }
});

module.exports=mysqlConnection;
