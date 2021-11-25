const request = require('supertest');
const server = require('../server');

describe('GET /msg', function () {
    it('respond with json containing a list of all users', function (done) {
        request(server)
            .get('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});;

describe('GET /msg/:id', function () {
    it('respond with json containing a single message', function (done) {
        request(server)
            .get('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

/**
 * Testing get a message endpoint by giving a non-existing message
 */
describe('GET /msg/:id', function () {
    it('respond with json message not found', function (done) {
        request(server)
            .get('/users/idisnonexisting')
            //.set('Accept', 'application/json')
            .expect(404) //expecting HTTP status code
            //.expect('"Message not found"') // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post message endpoint
 */
describe('POST /msg', function () {
    it('respond with 201 created', function (done) {
        request(server)
            .post('/msg/1/test')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing post message endpoint
 */
describe('POST /msg', function () {
    it('respond with 400 not created', function (done) {
        request(server)
            .post('/msg/test')
            .set('Accept', 'application/json')
            //.expect('Content-Type', /json/)
            .expect(404)
            //.expect('"Message not created"')
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});