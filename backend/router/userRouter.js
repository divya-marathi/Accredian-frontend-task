const express = require('express');
const userController = require('../controllers/userControllers');

const userRouter = express.Router();

// User registration
userRouter .post('/register', userController.registerUser);

// User login
userRouter .post('/login', userController.loginUser);

module.exports = userRouter;
