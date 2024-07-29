const service = require("./bookService");

jest.mock("./bookService");

// describe , test, expect

describe("Test Book Service functions", () => {
    test("As a user I want to get a book", async () => {
        const books = await service.getBooks();
        console.log("books", books);
        expect(books.data[0].title).toEqual("Happy Daze");
        expect(books.data[0].author).toEqual("Jimmy Hendrix");
        expect(books.data[0].ISBN).toEqual("10-8484039-28393");
        expect(books.data[0].numberOfPages).toEqual("290");
        expect(books.data[0].price).toEqual(12.99);
        expect(books.data[0].yearPublished).toEqual("1970");
    });
    test("As a user I want to save a book and get the book", async () => {
        const books = await service.postBook();
        console.log("books", books);
        expect(books.data.title).toEqual("Happy Daze");
        expect(books.data.author).toEqual("Jimmy Hendrix");
        expect(books.data.ISBN).toEqual("10-8484039-28393");
        expect(books.data.numberOfPages).toEqual("290");
        expect(books.data.price).toEqual(12.99);
        expect(books.data.yearPublished).toEqual("1970");
    });
    test("As a user I want to get a book by Id and return the book", async () => {
        const books = await service.getBookById();
        console.log("books", books);
        expect(books.data.title).toEqual("Happy Daze");
        expect(books.data.author).toEqual("Jimmy Hendrix");
        expect(books.data.ISBN).toEqual("10-8484039-28393");
        expect(books.data.numberOfPages).toEqual("290");
        expect(books.data.price).toEqual(12.99);
        expect(books.data.yearPublished).toEqual("1970");
    });
    test("Aa a user I want to update a book by Id and return acknowledgment", async () => {
        const books = await service.updateBookById();
        console.log("books", books);
        expect(books.data.acknowledged).toEqual(true);
        expect(books.data.modifiedCount).toEqual(1);
        expect(books.data.upsertedId).toEqual(null);
        expect(books.data.upsertedCount).toEqual(0);
        expect(books.data.matchedCount).toEqual(1);
    });
    test("As a user I want to delete a book by Id and return acknowledgement", async () => {
        const book = await service.deleteBookById();
        console.log("book", book);
        expect(book.data.acknowledged).toEqual(true);
        expect(book.data.deletedCount).toEqual(1);
    });
    test("As a user I want to get the book Ids", async() => {
    const books = await service.getBookIds();
    expect(books.data[0]._id).toEqual("66a565d66eee3065e7368e47");
    expect(books.data[0].title).toEqual("War and Peace");
    });
});

