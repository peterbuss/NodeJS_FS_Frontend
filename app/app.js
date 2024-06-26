const express =  require('express');
const cors = require('cors');
const router = require('../routes/router');

const app = express();
// cors middleware
app.use(cors());

// json requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middleware templating
app.set('view engine', 'ejs');
app.engine('ejs', require('ejs').__express);

// static site for middleware use
app.use(express.static('public'));
app.use(express.static('views'));


// home route
app.use('/', router);


module.exports = app;

