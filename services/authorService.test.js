const service = require("./authorService");

jest.mock('./authorService');

describe("Test Authors calls to the backend", () => {
    test("Get Authors should return authors", async() => {
        const authors = await service.getAuthors();

        expect(authors.data[0].name).toEqual('Leo Tolstoy');
        expect(authors.data[0].book.title).toEqual('War and Peace');
        expect(authors.data[0].book.author).toEqual('Leo Tolstoy');
        expect(authors.data[0].book.ISBN).toEqual('123-12-145-0');
        expect(authors.data[0].book.numberOfPages).toEqual('3467');
        expect(authors.data[0].book.price).toEqual(45.79);
        expect(authors.data[0].book.yearPublished).toEqual('1888');
        expect(authors.data[0].publisher).toEqual('tynsdale');
        expect(authors.data[0].website).toEqual('www.tynsdale.com');
        expect(authors.data[0].twitter).toEqual('@Leo');        
        expect(authors.data[0].about).toEqual("I'm Leo");
    });

    test("As a user I want to save an author",async() => {
        const author = await service.postAuthor();
        expect(author.data.name).toEqual('Leo Tolstoy');
        expect(author.data.publisher).toEqual('tynsdale');
        expect(author.data.website).toEqual('www.tynsdale.com');
        expect(author.data.twitter).toEqual('@Leo');
        expect(author.data.about).toEqual("I'm Leo");        
    });

    test("As a user I want to get a user by Id", async() => {
        const author = await service.getAuthorById();
        expect(author.data.name).toEqual('Leo Tolstoy');
        expect(author.data.book.title).toEqual('War and Peace');
        expect(author.data.book.author).toEqual('Leo Tolstoy');
        expect(author.data.book.ISBN).toEqual('123-12-145-0');
        expect(author.data.book.numberOfPages).toEqual('3467');
        expect(author.data.book.price).toEqual(45.79);
        expect(author.data.book.yearPublished).toEqual('1888');
        expect(author.data.publisher).toEqual('tynsdale');
        expect(author.data.website).toEqual('www.tynsdale.com');
        expect(author.data.twitter).toEqual('@Leo');        
        expect(author.data.about).toEqual("I'm Leo");
    });

    test("As a user I want to update an author and return an acknowledgement", async() => {
        const result = await service.updateAuthorById();
        expect(result.data.acknowledged).toEqual(true);
        expect(result.data.modifiedCount).toEqual(1);
        expect(result.data.upsertedId).toEqual(null);
        expect(result.data.upsertedCount).toEqual(0);
        expect(result.data.matchedCount).toEqual(1);
    });

    test("As a user I want to delete an author and return and acknowledgement", async() => {
        const result = await service.deleteAuthorById();
        expect(result.data.acknowledged).toEqual(true);
        expect(result.data.deletedCount).toEqual(1);       

    });
});
