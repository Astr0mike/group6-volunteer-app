const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'nehahooda', //update with your own username
    password: '2201', // please use your local machine's password :)
    database: 'volunteerDB', // test
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();