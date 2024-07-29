

const getBooks = async () => {
    console.log("Mocked get books");
    return Promise.resolve({
        data: [
            {
                title: "Happy Daze",
                author: "Jimmy Hendrix",
                ISBN: "10-8484039-28393",
                numberOfPages: "290",
                price: 12.99,
                yearPublished: "1970",
            },
        ],
    });
};

const postBook = async () => {
    console.log("Mocked post book");
    return Promise.resolve({
            data: {
                title: "Happy Daze",
                author: "Jimmy Hendrix",
                ISBN: "10-8484039-28393",
                numberOfPages: "290",
                price: 12.99,
                yearPublished: "1970",
            }
    });
};

const getBookById = async () => {
    // is a get by id
    console.log("Mocked get book by Id");
    return Promise.resolve({
        data: {
            title: "Happy Daze",
            author: "Jimmy Hendrix",
            ISBN: "10-8484039-28393",
            numberOfPages: "290",
            price: 12.99,
            yearPublished: "1970",
        }        
    });
};

const updateBookById = async () => {
    console.log("Mocked update book by Id");
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

const deleteBookById = async(req) => {
    console.log("Mocked delete book by Id");
    return Promise.resolve({
        data:{
            "acknowledged": true,
            "deletedCount": 1,
        }        
    });
};

const getBookIds = async() => {
    console.log("Mocked getBookIds");
    return Promise.resolve({
        data: [
            {
                _id: '66a565d66eee3065e7368e47',
                title: 'War and Peace'
            }
        ]
    });
};


module.exports = { 
    getBooks, 
    postBook, 
    getBookById, 
    updateBookById,
    deleteBookById,
    getBookIds
 };

