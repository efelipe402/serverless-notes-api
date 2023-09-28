'use strict';

let init = require('./steps/init')
let { authenticated_user } = require('./steps/given');
let { createNote } = require('./steps/when');
let idToken;
describe('Given an authenticated user', () => {

    beforeAll(async () => {
        init();
        let user = await authenticated_user();
        idToken = user.AuthenticationResult.IdToken;

    })

    describe('When invoke POST /notes', () => {
        it('Should create a note', async () => {
         
            const body = {
                id: '1000',
                title: 'My test note',
                body: 'Hello this is the body note'
            }
            let result = await createNote({idToken, body});
            expect(result.statusCode).toEqual(201);
            expect(result.body).not.toBeNull();
        })
    })
})