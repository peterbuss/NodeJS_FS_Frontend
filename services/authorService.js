const axios = require('axios');
require("dotenv").config();

const getAuthors = async(req) => {
    console.log("req headers", req.headers);
    axios.defaults.headers.get['Authorization'] = `${req.headers.authorization}`;
    return await axios.get(process.env.url + "authors");
};

const deleteAuthorById = async (req) => {
    console.log("req headers", req.headers);
    axios.defaults.headers.delete['Authorization'] = `${req.headers.authorization}`;
    return await axios.delete(process.env.url + "authors/" + req.params.id) ;
};

const getAuthorById = async (req) => {
    axios.defaults.headers.get['Authorization'] = `${req.headers.authorization}`;
    return await axios.get(process.env.url + "authors/" + req.params.id);
};

const updateAuthorById = async (req) => {
    console.log("updabid", req.body.id);
    axios.defaults.headers.patch['Authorization'] = `${req.headers.authorization}`;
    return await axios.patch(process.env.url + "authors/" + req.body.id, {
        name: req.body.name,
        bookId: req.body.bookId,
        publisher: req.body.publisher,
        website: req.body.website,
        twitter: req.body.twitter,
        about: req.body.about
    });    
};

const postAuthor = async(req) => {
    axios.defaults.headers.post['Authorization'] = `${req.headers.authorization}`;
    return await axios.post(process.env.url + 'authors', {
        name: req.body.name,
        book: req.body.bookId,
        publisher: req.body.publisher,
        website: req.body.website,
        twitter: req.body.twitter,
        about: req.body.about
    });
};


module.exports = { 
    getAuthors, 
    deleteAuthorById, 
    getAuthorById, 
    updateAuthorById,
    postAuthor 
};