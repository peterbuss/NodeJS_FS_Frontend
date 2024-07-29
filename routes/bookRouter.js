const express = require('express');
const { 
    getBookHandler, 
    addBookHandler, 
    postBookHandler,
    editBookHandler, 
    updateBookHandler,
    deleteBookHandler
} = require('../handlers/bookHandler');
const bookRouter = express.Router();


bookRouter.get('/', getBookHandler) ;
bookRouter.post('/', postBookHandler);
bookRouter.post('/update', updateBookHandler);
bookRouter.get('/addBook', addBookHandler) ;
bookRouter.get('/editBook/:id', editBookHandler);
bookRouter.get('/deleteBook/:id', deleteBookHandler);

module.exports = bookRouter;
