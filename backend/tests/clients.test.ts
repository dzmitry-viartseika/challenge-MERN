import request from 'supertest';
import app from '../index'
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import {STUB_CLIENT_RESPONSE} from "./mockData/mock";
const runTest = async () => {
    const mongod = await MongoMemoryServer.create();
    await mongod.start();
    const uri = await mongod.getUri()
    // Do your tests here
    console.log('MongoDB URI:', uri)
    await mongod.stop()
}

describe.skip('deleteClient method', () => {

    let mongoServer: any = undefined;

    beforeAll(async () => {
        mongoServer = await MongoMemoryServer.create();
        const mongoUri = await mongoServer.getUri();

        await mongoose.connect(mongoUri);
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it('has a deleteClient method', async () => {
        // await runTest()
        const response = await request(app).get('/api/v1/clients');
        expect(response.statusCode).toBe(200)
    })

    it('has a deleteClient method', async () => {
        const response = await request(app).post('/api/v1/clients').send(STUB_CLIENT_RESPONSE)
        expect(response.statusCode).toBe(200);

        const responseData = {
            ...response.body,
            client: {
                ...response.body.client,
                ...STUB_CLIENT_RESPONSE,
            }
        }
        // expect(response.body.userId).toBeDefined()
        expect(response.body).toMatchObject(responseData)
    })

    it('should return a 500 status code', async () => {
        const ID = '1';
        const response = await request(app).delete(`/api/v1/clients/${ID}`)
        expect(response.statusCode).toBe(500)
    })

    it('should return a 200 status code', async () => {
        const ID = '65132efa381b68d9612f9acd';
        const response = await request(app).delete(`/api/v1/clients/${ID}`)
        expect(response.statusCode).toBe(200)
    })

    it("should specify json as the content type in the http header", async () => {
        const response = await request(app).post('/api/v1/clients').send(STUB_CLIENT_RESPONSE)
        expect(response.headers['content-type']).toEqual(expect.stringContaining('json'))
    })


    // it('should catch missing required fields', async () => {
    //     const response = await request(app).post('/api/v1/clients').send({
    //         firstName: 'Test',
    //         lastName: '',
    //         email: 'test@gmail.com'
    //     })
    //     expect(response.statusCode).toBe(400)
    //     expect(response.body).toStrictEqual({
    //         code: 400,
    //         message: 'Fill in required fields',
    //     })
    // })

    // it('should catch missing required fields', async () => {
    //     const response = await request(app).post('/api/v1/clients').send({
    //         firstName: 'Test',
    //         lastName: '',
    //         email: 'test@gmail.com'
    //     })
    //     expect(response.statusCode).toBe(400)
    //     expect(response.body).toStrictEqual({
    //         code: 400,
    //         message: 'Fill in required fields',
    //     })
    // })
})

import express from "express";
// import supertest from "supertest";
// import app from '../index'
//
// describe('GET /clients', function() {
//     test("DELETE /api/posts/:id", async () => {
//         const post = await Post.create({
//             title: "Post 1",
//             content: "Lorem ipsum",
//         })
//
//         await supertest(app)
//             .delete("/api/v1/clients/" + post.id)
//             .expect(204)
//             .then(async () => {
//                 expect(await Post.findOne({ _id: post.id })).toBeFalsy()
//             })
//     })
// });
