const service = require('./userService');

jest.mock('./userService');  // makes the test use data from __mocks__/userService.js

describe('Test Service calls backend', () => {
    test('Post Register should return a user', async () => {
        let id = Math.floor(Math.random() * 100);
        const body = {
            firstName : "Peter",
            lastName: "BUSS",
            address: "123 bot street",
            city: "Bellach",
            state: "CA",
            zipCode: "12345",
            email: "peter1@mail.com",
            password: "wrongpw23"
        }

        const user = await service.postRegister(body);
        console.log('user.data', user.data);
        expect(user.data.message).toEqual('Successful Registration');
        expect(user.data.user.firstName).toEqual('Peter');
        expect(user.data.user.lastName).toEqual('BUSS');
        expect(user.data.user.address).toEqual('123 bot street');
        expect(user.data.user.city).toEqual('Bellach');
        expect(user.data.user.state).toEqual('CA');    
        expect(user.data.user.zipCode).toEqual('12345');
    });

    test('Post Login  should return a user', async () => {
        const body = {
            email: "peter@mail.com",
            password: "peter1234",
        };

        const user = await service.postLogin(body);
        console.log('Login user.data', user.data);
 
        expect(user.data.message).toEqual('Login Successful');
        expect(user.data.user.firstName).toEqual('Peter');
        expect(user.data.user.lastName).toEqual('BUSS');
        expect(user.data.user.address).toEqual('123 bord street');
        expect(user.data.user.city).toEqual('Bellach');
        expect(user.data.user.state).toEqual('CA');    
        expect(user.data.user.zipCode).toEqual('12345');
        expect(user.data.logged).toBe(true);

    });

});

//             email: `cryptoboy${id}@mail.com`

/* This code registers a new user, so the given user may not exist beforehand, otherwise test
   returns an error. */
