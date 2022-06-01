const request = require('supertest');
const bcrypt = require('bcrypt');
const app = require('../app');

const createUserPayload = {
    email: 'demo@gmail.com',
    password: '123456',
    username: 'demo'
}


describe("ALL complain api test suite", () => {
    it('create user', (done) => {
        request(app).post('/api/user/register')
        .send(createUserPayload)
        .expect('Content-Type', /json/)
        .expect(201)
        .end((error, response) => {
            console.log(response.body)
            if(response){
                expect(response.body).toEqual(expect.objectContaining({
                    email: 'demo@gmail.com',
                    username: 'demo'
                }));
                done();
            }
        })
    })
})