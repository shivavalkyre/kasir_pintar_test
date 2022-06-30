const express = require('express');
const router = express.Router();

// init controller
const {
    register,
    login,
    logout,
    change_password,
    profile
} = require('~/src/controllers/auth/authController');

// login user
router.route('/login')
    .post(login);

// register user
router.route('/register')
    .post(register);



// logout user
router.route('/logout')
    .post(logout);

module.exports = router;