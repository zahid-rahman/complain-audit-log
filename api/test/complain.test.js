const request = require('supertest');

const app = require('../app');
const { Sequelize } = require('sequelize');
const { log } = require('winston');
let token = null;
let latestComplainId = null;

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
    it('POST /api/user/register', (done) => {
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

    it('POST /api/user/login', (done) => {
        request(app).post('/api/user/login')
            .send(loginUserPayload)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
                token = response.body.data;
                console.log(token)
                expect(response.body).toEqual(expect.objectContaining({
                    data: token,
                    responseCode: 200
                }));
                done();
            })
    });

    it('POST /api/complain/create', (done) => {
        request(app)
            .post('/api/complain/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'insecurity at night',
                region: 'Malibag, dhaka',
                description: 'it is not safe to hangout at night time in malibag area specially with a girl. It is too dangerous',
                longitude: '24.534',
                lattitude: '23.2343',
                createdAt: new Date(),
                updatedAt: new Date()
            })
            .expect(201)
            .end((error, response) => {
                latestComplainId = response.body.data.id
                expect(response.body.responseCode).toEqual(201);
                done();
            });
    });

    it('GET /api/complain/view-all', (done) => {
        request(app)
            .get('/api/complain/view-all')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
                // expect(response.body).toBe(expect.objectContaining({
                //     message: "view all complain",
                //     data: expect.arrayContaining([
                //         expect.objectContaining({
                //             id: 1,
                //             name: expect.any(String),
                //             region: expect.any(String),
                //             description: expect.any(String),
                //             longitude: expect.any(String),
                //             lattitude: expect.any(String),
                //             createdAt: expect.any(Date),
                //             updatedAt: expect.any(Date),
                //         })
                //     ]),
                //     responseCode: 200
                // }))

                expect(response.body.responseCode).toEqual(200);
                done();
            })
    });

    it('GET /api/complain/view/:id', (done) => {
        request(app)
            .get('/api/complain/view/1')
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .end((error, response) => {
                expect(response.body.responseCode).toEqual(200);
                expect(response.body.data.id).toEqual(1)
                done();
            })
    });

    it('PATCH /api/complain/edit/:id', (done) => {
        request(app)
            .patch('/api/complain/edit/1')
            .set('Authorization', `Bearer ${token}`)
            .send({description: "demo description changed"})
            .expect(200)
            .end((error, response) => {
                expect(response.body.responseCode).toEqual(200);
                expect(response.body.data.description).toEqual("demo description changed")
                done();
            })
    });

    it('DELETE /api/complain/delete/:id', (done) => {
        request(app)
            .delete(`/api/complain/delete/${latestComplainId}`)
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
            .end((error, response) => {
                expect(response.body.responseCode).toEqual(200);
                expect(response.body.data).toEqual(1)
                done();
            })
    })

    afterAll(async () => {
        await sequelize.close()
    })
})