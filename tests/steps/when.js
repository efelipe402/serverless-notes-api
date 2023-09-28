'use-strict'

var Promise = this.Promise || require('promise');
var agent = require('superagent-promise')(require('superagent'), Promise)
const _ = require('lodash');
const makeHttpRequest = async (path, method, options) => {
    const url = process.env.TEST_API_URL;
    const test_url = `${url}/${path}`;
    let httpReq = agent(method, url);
    let body = _.get(options, "body");
    let idToken = _.get(options, "idToken");
    console.log(`Invloking HTTP ${method} ${test_url}`);


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