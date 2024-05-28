const express = require('express');
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');
const { validateRegistration, validateLogin } = require('../validation/validation');
const { postRegister, postLogin } = require('../services/userService');
const router = express.Router();
let session = require('express-session');
require('dotenv').config();

//use middleware to create express  session
router.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: true,
  }));


// static stuff

router.get('/', (req, res) => {
    session = req.session;
    res.render('home', { pagename: 'Home', session: session });
});

router.get('/login', (req, res) => {
    res.render('login', { pagename: 'Login' });
});

router.post('/login', (req, res) => {
    console.log("Loging in");
    session = req.session;
    const errors = validateLogin(req.body);
    if(isEmpty(errors)) {
        postLogin(req.body)
            .then(result => {
                console.log('login data', result.data);
                session.name = result.data.user.firstName;
                session.logged = result.data.logged;
                session.token = result.data.token;
                res.render('home', { 
                    pagename: 'Home', 
                    message: result.data.message,
                    session: session,
            });
        })
        .catch(err => {
            console.log(err.response);
            res.render('login', { 
                pagename: 'Login', 
                message: err.response.data.error.message,
            });                
        });
    } else {
        res.render('login', { 
            pagename: 'Login',
            body: req.body,
            errs: errors,
            message: messages.failed_login, 
        });        
    }
});

router.get('/register', (req, res) => {
    console.log('Unsuccessful register to GET')
    res.render('register', {
        pagename: 'Register',
        message: '',
    });
});

router.post('/register', (req, res) => {
    console.log('Registering');
    console.log('body', req.body);
    const errors = validateRegistration(req.body);
    console.log('errors', errors);
    console.log('failed reg message', messages.failed_register);
    if(isEmpty(errors)) {
        // call the backend

        postRegister(req.body).then(
            result => {
                res.render('login', { 
                    pagename: 'Login',
                    message: result.data.message, 
               });
            }
        )

        .catch(err => {
            console.log('catch err', err.response);  // .data.error.message
            res.render('register', { 
                pagename: 'Register',
                message: err.response.data.error.message,             
            });
        });


    } else {
        res.render('register', {
            pagename: 'Register',
            body: req.body,
            errs: errors,
            message: messages.failed_register, 
        });
    }
});

router.get('/about', (req, res) => {
    session = req.session;
    res.render('about', { pagename: 'About', session: session });
});

router.get('/logout', (req, res) => {
    req.session.destroy(null);
    res.render('home', { pagename: 'Home' });
});


// <title><%= pagename %></title>


module.exports = router;

