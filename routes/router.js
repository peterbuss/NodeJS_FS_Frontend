const express = require('express');
const router = express.Router();

// static stuff

router.get('/', (req, res) => {
    res.render('home', { pagename: 'Home' });
});


router.get('/about', (req, res) => {
    res.render('about', { pagename: 'About' });
});

router.get('/login', (req, res) => {
    res.render('login', { pagename: 'Login' });
});

router.get('/register', (req, res) => {
    res.render('register', { pagename: 'Register' });
});

router.get('/about', (req, res) => {
    res.render('about', { pagename: 'About' });
});

// <title><%= pagename %></title>


module.exports = router;

