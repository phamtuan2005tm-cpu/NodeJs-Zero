const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    port: 3306, 
    user: 'root',
    password: 'tuan0403',
    database: 'node_js_thai_tuan',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0
});

const connection = pool.promise();

pool.getConnection((err, conn) => {
    if(err) {
        console.log('Thất bại', err.mesage);
        return;
    }
    console.log('Ngon lành');
    conn.release();
});

module.exports = connection;