let session = require('express-session');
const successTemplate = require('../templates/successTemplate');
const errorTemplate = require('../templates/errorTemplate');
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');
const { validateRegistration, validateLogin } = require('../validation/validation');
const { postRegister, postLogin } = require('../services/userService');

const getHomeHandler = (req, res) => {
    session = req.session;
    return successTemplate(res, 'home', 'Home', null, session);
};

const getLoginHandler = (req, res) => {
    session = req.session;
    successTemplate(res, 'login', 'Login', null, session);
    //res.render('login', { pagename: 'Login' });
};

const getRegisterHandler = (req, res) => {
    session = req.session;
    return successTemplate(res, 'register', 'Register', null, session);
    //res.render('register', {pagename: 'Register'});
};

const getAboutHandler = (req, res) => {
    session = req.session;
    return successTemplate(res, 'about', 'About', null, session);
    //res.render('about', { pagename: 'About', session: session });
};

const getLogoutHandler = (req, res) => {
    console.log('Logout');
    req.session.destroy(null);
    console.log(session);
    return successTemplate(res, 'home', 'Home', null, 'undefined');
    //res.render('home', { pagename: 'Home' });
};

const postLoginHandler = async (req, res) => {
    try {
        console.log("Loging in");
        session = req.session;
        const errors = validateLogin(req.body);
        if(isEmpty(errors)) {
            const result = await postLogin(req.body);
            session.name = result.data.user.firstName;
            session.logged = result.data.logged;
            session.token = result.data.token;
            return successTemplate(res, 'home', 'Home', result.data.message, session);
        } else {
            //throw new Error(messages.failed_login);
            errorTemplate(req, res, 'login', 'Login', messages.failed_login, errors, session);
        }
    }
    catch(e) {
        console.log("Error caught", e.response.data.error);
        return errorTemplate(
            req, 
            res, 
            'login', 
            'Login', 
            e.response.data.error.mesasage, 
            'undefined', 
            'undefined');
    }
};

const postRegisterHandler = async (req, res) => {
    try {
        session = req.session;
        console.log('Registering');
        console.log('body', req.body);
        const errors = validateRegistration(req.body);
        console.log('errors', errors);
        console.log('failed reg message', messages.failed_register);
        if(isEmpty(errors)) {
            // call the backend
            const result = await postRegister(req.body);
            return successTemplate(
                res, 
                'login', 
                'Login', 
                messages.successful_register, 
                session);    
        } else {
            return errorTemplate(
                        req, 
                        res, 
                        'register', 
                        'Registration', 
                        messages.failed_registration, 
                        errors);
        }
    }
    catch(e) {
        return errorTemplate(req, res, 'register', 'Registration', messages.failed_registration);
    }
};

module.exports = {  getHomeHandler, 
                    getLoginHandler, 
                    getRegisterHandler, 
                    getAboutHandler,
                    getLogoutHandler,
                    postLoginHandler,
                    postRegisterHandler 
                };

