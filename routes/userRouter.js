const express = require('express');
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');
const { validateRegistration, validateLogin } = require('../validation/validation');
const { postRegister, postLogin } = require('../services/userService');
const router = express.Router();
let session = require('express-session');
require('dotenv').config();
const { getHomeHandler, 
        getLoginHandler, 
        getRegisterHandler, 
        getAboutHandler,
        getLogoutHandler, 
        postLoginHandler,
        postRegisterHandler} = require('../handlers/userHandler');

//use middleware to create express  session
router.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: true,
  }));


// static stuff

router.get('/', getHomeHandler);

router.get('/login', getLoginHandler);

router.post('/login', postLoginHandler);

router.get('/register', getRegisterHandler);

/* 
router.get('/register', (req, res) => {
    console.log('Unsuccessful register to GET')
    res.render('register', {
        pagename: 'Register',
        message: '',
    });
});
 */

router.post('/register', postRegisterHandler);

router.get('/about', getAboutHandler);

router.get('/logout', getLogoutHandler);

/* 
router.get('/logout', (req, res) => {
    req.session.destroy(null);
    res.render('home', { pagename: 'Home' });
});

 */




module.exports = router;

