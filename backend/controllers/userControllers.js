const bcrypt = require('bcrypt');
const userModel = require('../models/userModel');

const userController = {
  initializeUserTable: (req, res) => {
    userModel.createUserTable();
    res.json({ success: true, message: 'User table initialization started' });
  },

  //user registration
  registerUser: (req, res) => {
    const { username, email, password } = req.body;

    const existUserQuery = 'SELECT * FROM users WHERE email = ?';
    const insertUserQuery = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';

    userModel.query(existUserQuery, [email])
      .then(existingUser => {
        if (existingUser.length > 0) {
          res.status(400).json({ success: false, message: 'Email already registered' });
        } else {
          bcrypt.hash(password, 10, (err, hashedPassword) => {
            if (err) {
              res.status(500).json({ success: false, message: 'Internal Server Error' });
            } else {
              userModel.query(insertUserQuery, [username, email, hashedPassword])
                .then(result => res.json(result))
                .catch(error => res.status(500).json({ success: false, message: 'Internal Server Error' }));
            }
          });
        }
      })
      .catch(error => {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      });
  },
  

  //user login
  loginUser: (req, res) => {
    const { email, password } = req.body;

    const getUserQuery = 'SELECT * FROM users WHERE email = ?';

    userModel.query(getUserQuery, [email])
      .then(results => {
        const user = results.length > 0 ? results[0] : null;

        if (user) {
          bcrypt.compare(password, user.password, (err, match) => {
            if (match) {
              res.json({ success: true, message: 'Login successful' });
            } else {
              res.json({ success: false, message: 'Invalid credentials' });
            }
          });
        } else {
          res.json({ success: false, message: 'Invalid credentials' });
        }
      })
      .catch(error => {
        res.status(500).json({ success: false, message: 'Internal Server Error' });
      });
  },

  
};

module.exports = userController;
