require("../mongoConfig")

const routes = require('../routes/msg')

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use("/", routes)

describe('GET /msg', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});;

describe('GET /msg/:id', function () {
    it('respond with json containing a single message', function (done) {
        request(app)
            .get('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json message not found', function (done) {
        request(app)
            .get('/msg/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(400) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
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
	const data = {
		Message: "test",
	}

    it('respond with 201 created', function (done) {
        request(app)
	    .post('/msg/1')
	    .type('form')
	    .send(data)
	    .then(() => {
	    request(app)
	        .get('/msg/1')
	        .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(200, done)
	    });
    });

    it('respond with 400 not updated', function (done) {
        request(app)
            .post('/msg/1')
            .set('Accept', 'application/json')
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});