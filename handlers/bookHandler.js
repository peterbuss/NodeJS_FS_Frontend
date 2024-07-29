const successTemplate = require("../templates/successTemplate");
const errorTemplate = require("../templates/errorTemplate");
let session = require('express-session');
const { 
    getBooks, 
    postBook, 
    getBookById,
    updateBookById,
    deleteBookById 
} = require('../services/bookService');
//const { post } = require("../routes/bookRouter");
//const { postBook } = require("../../backend/services/bookService");
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');

const getBookHandler = async (req, res) => {
    try {
        console.log("Start of Book Handler");
        session = req.session;
        req.headers.authorization ='Bearer: ' + session.token;
        console.log("Before call to getBooks");
        const books = await getBooks(req);

        console.log("bookHandler - getBookHandler", books.data.result);
        if(!isEmpty(books.data.result)) {
            successTemplate(res, 'books', 'Books', books.data.message, session, books.data.result);
        } 
        else {
            successTemplate(res, 'books', 'Books', messages.no_books_found, session);
        }
    }
    catch(e) {
        return errorTemplate(
            req, 
            res, 
            'books', 
            'Books',
             e.message, 
             'undefined', 
             'undefined'
            );
    }


};

const addBookHandler = async (req, res) => {
    try {
        session = req.session;
        successTemplate(res, 'addBook', 'Add a book', null, session);
    }
    catch(e) {
        return errorTemplate(
            req, 
            res, 
            'books', 
            'Book', 
            e.message, 
            'undefined', 
            'undefined'
        );
    }
};

const postBookHandler = async (req, res) => {
    try {
        console.log("Post book");
        session = req.session ;
        req.headers.authorization ='Bearer: ' + session.token;
        console.log("auth token frontend", req.headers.authorization);
        const book = await postBook(req);
        const books = await getBooks(req);

        successTemplate(
            res, 
            'books', 
            'Book', 
            book.data.message, 
            session, 
            books.data.result
            );
    }
    catch(e) {
        return errorTemplate(
            req, 
            res, 
            'books', 
            'Books', 
            e.message, 
            'undefined', 
            'undefined'
          );
    }


    // get our req .book
    // save the book
    // get the array and push the new book to it

};

const editBookHandler = async (req, res) => {
    try {
        let session = req.session;
        req.headers.authorization ='Bearer: ' + session.token;       
        const book = await getBookById(req);
        console.log("Book in editBookHandler", book.data);
        return successTemplate(
            res, 
            "editBook", 
            "Edit a book", 
            book.data.message, 
            session, 
            book.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req,
            res,
            'books',
            'Books',
            e.message,
            "undefined",
            "undefined"
        );
    }
};

const updateBookHandler = async (req, res) => {
    try {
        console.log("bhandler");
        session = req.session;
        req.headers.authorization ='Bearer: ' + session.token;     
        const result = await updateBookById(req);
        const books =  await getBooks(req);
        console.log("get Books");
        return successTemplate(
            res,
            'books',
            'Books',
            result.data.message,
            session,
            books.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req,
            res,
            'books',
            'Books',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

const deleteBookHandler = async (req, res) => {
    try {
        session = req.session;
        req.headers.authorization ='Bearer: ' + session.token;     
        const result = await deleteBookById(req);
        const books = await getBooks(req);
        return successTemplate(
            res,
            'books',
            'Books',
            result.data.message,
            session,
            books.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req,
            res,
            'books',
            'Books',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

module.exports = { 
    getBookHandler, 
    addBookHandler, 
    postBookHandler, 
    editBookHandler,
    updateBookHandler,
    deleteBookHandler 
};

