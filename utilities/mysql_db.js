const mysql = require("mysql2");
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.dbHost,
    user: "root",
    password: "",
    database: "nodejs"
}).promise();

module.exports = db