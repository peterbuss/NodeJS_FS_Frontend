const express = require('express');
const authorRouter = express.Router();
let session = require('express-session');
require("dotenv").config();
const { getAuthorsHandler, 
        deleteAuthorHandler, 
        editAuthorHandler,
        updateAuthorHandler,
        addAuthorHandler,
        postAuthorHandler } = require('../handlers/authorHandler');


// middleware for express session
authorRouter.use(
    session({
        secret: process.env.secret,
        resave: false,
        saveUninitialized: true,
    })
);

// routers only accept post's and get's

authorRouter.get("/", getAuthorsHandler);

authorRouter.post("/", postAuthorHandler);

authorRouter.post("/update", updateAuthorHandler);

authorRouter.get('/addAuthor', addAuthorHandler);

authorRouter.get("/editAuthor/:id", editAuthorHandler);

authorRouter.get("/deleteAuthor/:id", deleteAuthorHandler);




module.exports = authorRouter;

