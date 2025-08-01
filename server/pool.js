const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'root', //update with your own username
    password: 'bB#7#c98s25!', // please use your local machine's password :)
    database: 'volunteerDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();