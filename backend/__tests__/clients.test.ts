import request from 'supertest'
import mongoose from "mongoose";
import {MONGODB_URI} from "../config/config";
import app from "../index";
import dotenv from "dotenv";

dotenv.config();

beforeEach(async () => {
    console.log('beforeEach')
    await mongoose.connect(MONGODB_URI);
});

afterEach(async () => {
    await mongoose.connection.close();
});



const STUB_GET_CLIENTS_RESPONSE =  {
    "clients": [
        {
            "_id": "6509f54a1ffa223df739e862",
            "firstName": "test",
            "lastName": "test",
            "email": "test@gmail.com",
            "birthDate": "test",
            "role": "User",
            "createdAt": 1695151434,
            "updatedAt": 1695151434,
            "__v": 0
        }
    ],
    "totalPage": 1,
    "currentPage": 1,
    "totalCount": 1,
    "pageSize": 10
}


describe("GET /api/clients", () => {
    it("should return clients", async () => {
        const res = await request(app).get(
            "/api/clients"
        );
        expect(res.statusCode).toBe(200);
        expect(res.body).toStrictEqual(STUB_GET_CLIENTS_RESPONSE);
    });
});