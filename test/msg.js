require("../mongoConfig")

const routes = require('../routes/msg')

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: false }))
app.use("/", routes)

/**
 * Testing post message logic
 */
describe('POST /msg/:id', function () {
	const data = {
		message: "test",
	}

    it('respond with 201 created', function (done) {
        request(app)
	    .post('/msg/1')
	    .type('form')
	    .send(data)
	    .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(201, done);
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

    it('respond with 400 not updated', function (done) {
        request(app)
            .post('/msg/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(404)
            .expect('Content-Type', /json/)
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing get message logic
 */
describe('GET /msg', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .get('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

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
            .get('/msg/2')
            .set('Accept', 'application/json')
            .expect(400) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with json message not found', function (done) {
        request(app)
            .get('/msg/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(404) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing put message logic
 */
describe('PUT /msg/:id', function () {
    it('respond with json containing a single message', function (done) {
        request(app)
            .put('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    it('respond with json message not found', function (done) {
        request(app)
            .put('/msg/2')
            .set('Accept', 'application/json')
            .expect(400) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    it('respond with json message not found', function (done) {
        request(app)
            .put('/msg/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(404) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

/**
 * Testing delete message logic
 */
describe('DELETE /msg/:id', function () {
    it('respond with json containing a single message', function (done) {
        request(app)
            .delete('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('respond with json message not found', function (done) {
        request(app)
            .delete('/msg/1')
            .set('Accept', 'application/json')
            .expect(400) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /msg', function () {
    it('respond with json containing a list of all users', function (done) {
        request(app)
            .delete('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});