// describe('deleteClient method', () => {
//     it('has a deleteClient method', () => {
//         expect(true).toBeTruthy()
//     })
// })

import express from "express";
import request from "supertest";
import app from '../index'
import axios from "axios";

describe("test create route", () => {
    test("Should handle request param", async () => {
        const app = express();
        // Arrange

        // Act
        const receivedResponse = axios.get(
            `http://localhost:4000/api/v1/clients/`,
        );

        // Assert
        // ✅ Assertion happens in a dedicated stage and a dedicated library
        expect(receivedResponse).toMatchObject({
            status: 400,
            data: {
                reason: "no-name",
            },
        });
    });
})