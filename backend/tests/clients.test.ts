import request from 'supertest';
import app from '../index'

const STUB_CLIENT_RESPONSE = {
    firstName: 'Test',
    lastName: 'TEst',
    email: 'test@gmail.com'
}

describe('deleteClient method', () => {
    it('has a deleteClient method', async () => {
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
        console.log('responseData', responseData)
        expect(response.body).toMatchObject(responseData)
    })

    it('tst', async () => {
        const ID = '1';
        const response = await request(app).delete(`/api/v1/clients/${ID}`)
        expect(response.statusCode).toBe(500)
    })

    it.only('tst', async () => {
        const ID = '65132efa381b68d9612f9acd';
        const response = await request(app).delete(`/api/v1/clients/${ID}`)
        expect(response.statusCode).toBe(200)
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
