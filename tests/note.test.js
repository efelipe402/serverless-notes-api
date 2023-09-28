'use strict';

let init = require('./steps/init')
let { authenticated_user } = require('./steps/given');
let { createNote, updateNote, deleteNote } = require('./steps/when');
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
                id: '1002',
                title: 'My test note',
                body: 'Hello this is the body note'
            }
            let result = await createNote({ idToken, body });
            expect(result.statusCode).toEqual(201);
            expect(result.body).not.toBeNull();
        })
    })

    describe('When invoke PUT /notes', () => {
        it('Should update a note', async () => {

            const noteId = '1002';
            const body = {
                title: 'My updated test note',
                body: 'Hello this is the body updated note'
            }
            let result = await updateNote({ idToken, body, noteId });
            expect(result.statusCode).toEqual(200);
            expect(result.body).not.toBeNull();
        })
    })

    describe('When invoke DELETE /notes', () => {
        it('Should delete a note', async () => {
            const noteId = '1002';
            let result = await deleteNote({ idToken, noteId });
            expect(result.statusCode).toEqual(200);
            expect(result.body).not.toBeNull();

        })
    })
})