const mysql = require('mysql2');

const dbConnection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'accredian',
  password: 'accredian',
  database: 'usersdb',
  port: 3306
});

dbConnection.connect(err => {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = dbConnection;
