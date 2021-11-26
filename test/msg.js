require("../mongoConfig")

const routes = require('../routes/msg')
const request = require('supertest');
const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: false }))
app.use("/", routes)

/**
 * Testing post message logic and response status codes
 */
describe('POST /msg/:id', function () {
	const data = {
		message: "test",
	}

	// Send basic message with id 1
    it('respond with 201 created', function (done) {
        request(app)
		    .post('/msg/1')
		    .type('form')
		    .send(data)
		    .set('Accept', 'application/json')
	        .expect('Content-Type', /json/)
	        .expect(201, done);
    });

    // Tries to send a message that already exists
    it('respond with 400 not posted', function (done) {
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

    // Tries to send a message with an id that won't work
    it('respond with 404 error', function (done) {
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
 * Testing get message logic and response status codes
 */
describe('GET /msg', function () {

	// Get info of entire database
    it('respond with 200 info recieved', function (done) {
        request(app)
            .get('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});

describe('GET /msg/:id', function () {

	//Get info of a message with id 1
    it('respond with 200 info recieved for one message', function (done) {
        request(app)
            .get('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    // Get info of a message that doesnt exist
    it('respond with 400 message not found', function (done) {
        request(app)
            .get('/msg/2')
            .set('Accept', 'application/json')
            .expect(400) 
            .expect('Content-Type', /json/) 
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });

    // Get info of a message with an id that won't work
    it('respond with 404 error', function (done) {
        request(app)
            .get('/msg/idisnonexisting')
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
 * Testing update message logic and response status codes
 */
describe('PUT /msg/:id', function () {

	// Update the info of a message with id 1
    it('respond with 201 message updated', function (done) {
        request(app)
            .put('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201, done);
    });

    // Update the info of a message that doesn't exist
    it('respond with 400 message not found', function (done) {
        request(app)
            .put('/msg/2')
            .set('Accept', 'application/json')
            .expect(400) 
            .expect('Content-Type', /json/) 
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });


    // Update the info of a message with an id that won't work
    it('respond with 404 error', function (done) {
        request(app)
            .put('/msg/idisnonexisting')
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
 * Testing delete message logic and response status codes
 */
describe('DELETE /msg/:id', function () {

	// Delete a message with id of 1
    it('respond with 200 single message deleted', function (done) {
        request(app)
            .delete('/msg/1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    // Delete a message that doesn't exist
    it('respond with 400 message not found', function (done) {
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

    // Delete a message with an id that won't work
    it('respond with 404 error', function (done) {
        request(app)
            .delete('/msg/idisnonexisting')
            .set('Accept', 'application/json')
            .expect(404) //expecting HTTP status code
            .expect('Content-Type', /json/) // expecting content value
            .end((err) => {
                if (err) return done(err);
                done();
            });
    });
});

describe('DELETE /msg', function () {

	// Delete all messages within database
    it('respond with 200 all messages deleted', function (done) {
        request(app)
            .delete('/msg')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
});