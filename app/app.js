const express =  require('express');
const cors = require('cors');
const userRouter = require('../routes/userRouter');
const bookRouter =  require('../routes/bookRouter');
const authorRouter = require('../routes/authorRouter');


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
// user router
app.use('/', userRouter);
// books router
app.use('/books', bookRouter);
// authors router
app.use('/authors', authorRouter);

app.use((req, res) => {
    //req.session.destroy(null);  -- was killing the session all the time
    res.status(404).render('404');
});

// error handling middleware
/* 
app.use((req, res, next) => {
    const error = new Error('Not Found!!');
    error.status = 404;
    next(error);
});

 */
module.exports = app;

