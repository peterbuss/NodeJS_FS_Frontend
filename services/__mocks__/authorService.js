const getAuthors = async() => {
    console.log("Mocked getAuthors");
    return Promise.resolve({
        data: [
            {
                name: 'Leo Tolstoy',
                book: {
                        title: 'War and Peace',
                        author: 'Leo Tolstoy',
                        ISBN: '123-12-145-0',
                        numberOfPages: '3467',
                        price: 45.79,
                        yearPublished: '1888'
                    },
                publisher: 'tynsdale',
                website: 'www.tynsdale.com',
                twitter: '@Leo',
                about: "I'm Leo"
            }
        ]
    });
};

const postAuthor = async() => {
    console.log("Mocked post author");
    return Promise.resolve({
        data: {
            name: 'Leo Tolstoy',
            publisher: 'tynsdale',
            website: 'www.tynsdale.com',
            twitter: '@Leo',
            about: "I'm Leo"
        }
    });
};

const getAuthorById = async () => {
    console.log("Mocked getAuthorById");
    return Promise.resolve({
        data: {
            name: 'Leo Tolstoy',
            book: {
                    title: 'War and Peace',
                    author: 'Leo Tolstoy',
                    ISBN: '123-12-145-0',
                    numberOfPages: '3467',
                    price: 45.79,
                    yearPublished: '1888'
                },
            publisher: 'tynsdale',
            website: 'www.tynsdale.com',
            twitter: '@Leo',
            about: "I'm Leo"
        }
    });
};

const deleteAuthorById = async () => {
    console.log("Mocked deleteAuthorById");
    return Promise.resolve({
        data:{
            "acknowledged": true,
            "deletedCount": 1,
        }
    });
};

const updateAuthorById = async (req) => {
    console.log("Mocked updateAuthorById");
    return Promise.resolve({
        data:{
            "acknowledged": true,
            "modifiedCount": 1,
            "upsertedId": null,
            "upsertedCount": 0,
            "matchedCount": 1
        }
    });
};


module.exports = { 
    getAuthors, 
    postAuthor,
    getAuthorById, 
    updateAuthorById,
    deleteAuthorById
};
