const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost', 
    user: 'IsabellaDiaz', //update with your own username
    password: 'id0311814', // please use your local machine's password :)
    database: 'volunteerDB',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = pool.promise();