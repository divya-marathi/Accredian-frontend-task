const dbConnection = require("../dbConnection");

//create table
const userModel = {
  createUserTable: () => {
    const createUserTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL)`;

    userModel.query(createUserTableQuery)
      .then(() => console.log('Users table created or already exists'))
      .catch(err => console.error('Error creating users table:', err));
  },

  query: (sql, values) => {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, values, (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  },

  findUserByEmail: async (email) => {
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';

    const results = await userModel.query(getUserQuery, [email]);
    return (results.length > 0 ? results[0] : null);
  },

  registerUser: (username, email, password) => {
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    return userModel.query(insertUserQuery, [username, email, password]);
  },
};

module.exports = userModel;
