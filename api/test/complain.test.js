const request = require('supertest');

const app = require('../app');
const { Sequelize } = require('sequelize');
const { log } = require('winston');
let token = null;




// const sequelize = new Sequelize(`postgres://db_user:alsdkfjl;eilaksfd90asf03:5432/complain_db`)

const sequelize = new Sequelize('complain_test_db', 'db_test_user', 'test', {
    host: 'localhost',
    dialect: 'postgres',
    port: '5433'
  });


const emailName = (Math.random() + 1).toString(36).substring(7);
const createUserPayload = {
    email: `${emailName}@gmail.com`,
    password: '123456',
    username: 'demo'
};

const loginUserPayload = {
    email: createUserPayload["email"],
    password: createUserPayload["password"]
}


describe("ALL complain api test suite", () => {

    beforeAll(async () => {
        await sequelize.authenticate();
    })
    it('create user', (done) => {
            request(app)
            .post('/api/user/register')
            .send(createUserPayload)
            .expect('Content-Type', /json/)
            .expect(201)
            .end((error, response) => {
                if (response) {
                    expect(response.body).toEqual(expect.objectContaining({
                        message: "user is created successfully",
                        data: null,
                        responseCode: 201
                    }));
                    done();
                }
            })
    });

    it('login user', (done) => {
        request(app).post('/api/user/login')
        .send(loginUserPayload)
        .expect('Content-Type', /json/)
        .expect(200)
        .end((error, response) => {
            token = response.body.data
            console.log(response.body)
            expect(response.body).toEqual(expect.objectContaining({
                data: token,
                responseCode: 200
            }));
            done();
        })
    });

    afterAll(async() => {
        await sequelize.close()
    })
})