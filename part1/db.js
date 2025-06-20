const mysql = require('mysql');

const pool = mysql.createPool({
host: 'localhost',
user: 'root',
password: '',
database: 'DogWalkService',
connectionLimit: 10,
});

module.exports = pool;