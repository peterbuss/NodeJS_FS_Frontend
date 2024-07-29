const axios = require('axios');
//const { author_deleted } = require('../../backend/messages/messages');
require('dotenv').config();


const getBooks = async (req) => {
    console.log("bookService - getBooks", req.headers.authorization);
    //axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return await axios.get(process.env.url + 'books');
};

const postBook = async (req) => {
    console.log("post book axios");
    console.log("url", process.env.url);
    return await axios.post(
        process.env.url + 'books', 
        {
            title: req.body.title,
            author: req.body.author,
            ISBN: req.body.ISBN,
            numberOfPages: req.body.numberOfPages,
            price: req.body.price,
            yearPublished: req.body.yearPublished,
        }, 
        axios.defaults.headers.post['Authorization'] = req.headers.authorization
    );
};

const getBookById = async (req) => {
    // is a get by id
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return axios.get(process.env.url + 'books/' + req.params.id);
};

const updateBookById = async (req) => {
    axios.defaults.headers.put['Authorization'] = req.headers.authorization;
    const body = req.body;
    console.log("body", body);
    console.log("updateBookById", body.id);
    return axios.put(process.env.url + 'books/' + body.id, {
        title: body.title,
        author: body.author,
        ISBN: body.ISBN,
        numberOfPages: body.numberOfPages,
        price: body.price,
        yearPublished: body.yearPublished
    });
};

const deleteBookById = async(req) => {
    axios.defaults.headers.delete['Authorization'] = req.headers.authorization;
    return axios.delete(process.env.url + 'books/' + req.params.id);  
};

const getBookIds = async(req) => {
    axios.defaults.headers.get['Authorization'] = req.headers.authorization;
    return axios.get(process.env.url + 'books/books');
};

module.exports = { 
    getBooks, 
    postBook, 
    getBookById, 
    updateBookById,
    deleteBookById,
    getBookIds
 };

