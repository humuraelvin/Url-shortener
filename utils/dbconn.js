const mysql = require('mysql');
require("dotenv").config()
const dbconnection = mysql.createConnection({
    host: process.env.HOST,
    user: "root",
    password: process.env.PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DB_PORT
});

dbconnection.connect((err) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        console.log(process.env.HOST);
        console.log(process.env.USER);
        console.log(process.env.PASSWORD);
        console.log(process.env.DATABASE_NAME);

        return;
    }
    console.log("Connected to MySQL database successfully");
});

module.exports = dbconnection;
