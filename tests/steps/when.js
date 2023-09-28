'use-strict'

var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise)
const _ = require('lodash');
const makeHttpRequest = async (path, method, options) => {
    const url = process.env.TEST_API_URL;
    const test_url = options.noteId ? `${url}/${path}/${options.noteId}` : `${url}/${path}`;
    let httpReq = agent(method, test_url);
    let body = _.get(options, "body");
    let idToken = _.get(options, "idToken");
    console.log(`Invoking HTTP ${method} ${test_url}`);


    try {

        httpReq.set('Authorization', idToken);
        if (body) {
            httpReq.send(body);
        }
        let response = await httpReq;

        return {
            statusCode: response.status,
            body: response.body
        }

    } catch (error) {
        return {
            statusCode: error.status,
            body: null
        }
    }
}

module.exports.createNote = (options) => {
    let response = makeHttpRequest('notes', 'POST', options);

    return response;
}

module.exports.updateNote = (options) => {
    let response = makeHttpRequest('notes', 'PUT', options);

    return response;
}

module.exports.deleteNote = (options) => {
    let response = makeHttpRequest('notes', 'DELETE', options);

    return response;
}

