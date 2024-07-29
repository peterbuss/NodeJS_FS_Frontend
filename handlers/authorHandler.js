
const { getAuthors, 
        deleteAuthorById, 
        getAuthorById,
        postAuthor,
        updateAuthorById } = require("../services/authorService");
const { getBookIds } = require('../services/bookService');
const errorTemplate = require('../templates/errorTemplate');
const successTemplate = require('../templates/successTemplate');
let session = require('express-session');
const isEmpty = require('../utilities/util');
const messages = require('../utilities/messages');


const getAuthorsHandler = async (req, res) => {
    try {
        session = req.session;
        console.log("session", session);
        req.headers.authorization = 'Bearer ' + session.token;
        console.log("rha", req.headers.authorization);
        const authors = await getAuthors(req);
        if(!isEmpty(authors.data.result)){
            console.log("not empty");
            return successTemplate(
                res, 
                'authors', 
                'Authors', 
                authors.data.message, 
                session, 
                authors.data.result
            );
        }
        else {
            console.log("empty");
            return successTemplate(
                res, 
                'authors', 
                'Authors', 
                messages.no_authors_found, 
                session
            );
        }
    }
    catch(e) {
        console.log("Hit error template on getAuthors");
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

const deleteAuthorHandler = async (req, res) => {
    try {
        let session = req.session;
        req.headers.authorization = 'Bearer ' + session.token;
        const result = await deleteAuthorById(req);
        console.log("result.data", result.data);
        const authors = await getAuthors(req);
        console.log("authors data", authors.data);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.message,
            session,
            authors.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

const editAuthorHandler = async (req, res) => {
    try {
        session = req.session;
        req.headers.authorization = 'Bearer ' + session.token;
        const author = await getAuthorById(req);
        return successTemplate(
            res,
            'editAuthor',
            'Edit an Author',
            author.data.message,
            session,
            author.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

const updateAuthorHandler = async(req, res) => {
    try {
        session = req.session;
        req.headers.authorization = 'Bearer ' + session.token;
        const result = await updateAuthorById(req);
        const authors = await getAuthors(req);
        return successTemplate(
            res,
            'authors',
            'Authors',
            result.data.message,
            session, 
            authors.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );       
    }
};

const addAuthorHandler = async(req, res) => {
    try {
        session = req.session;
        req.headers.authorization = 'Bearer ' + session.token;
        const result = await getBookIds(req);
        console.log("##########################################################");
        //console.log("The whole result", result);
        console.log("getBookIds", result.data);
        console.log("result.data.books", result.data.books);
        console.log("result data result", result.data.result);
        console.log("Are we here in addAuthorHandler");
        if(!isEmpty(result.data))
            console.log("have books");
        else
            console.log("there are no books");
        if(!isEmpty(result.data)) {
            return successTemplate(
                res,
                'addAuthor',
                'Add an Author',
                undefined,
                session,
                result.data.books
            );
        }
        else {
            return successTemplate(
                res,
                'addAuthor',
                'Add an Author',
                messages.cannot_find_books,
                session,
            );            
        }

    }
    catch(e) {
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );             
    }
};

const postAuthorHandler = async (req, res) => {
    try {
        session = req.session;
        req.headers.authorization = 'Bearer ' + session.token;
        const author = await postAuthor(req);
        const authors = await getAuthors(req);
        console.log(authors.data.result);
        return successTemplate(
            res,
            'authors',
            'Authors',
            author.data.message,
            session,
            authors.data.result
        );
    }
    catch(e) {
        return errorTemplate(
            req, 
            res,
            'authors',
            'Authors',
            e.message,
            'undefined',
            'undefined'
        );
    }
};

module.exports = {  getAuthorsHandler, 
                    deleteAuthorHandler,
                     editAuthorHandler, 
                     updateAuthorHandler,
                     addAuthorHandler,
                     postAuthorHandler
                  };

