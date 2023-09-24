import httpMocks from 'node-mocks-http';
import ClientService from "../services/clientService";

let req, res, next;

jest.mock("../models/clientModel");
next = jest.fn();

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe('DELETE', () => {
    it('has a deleteTodo method', () => {
        expect(typeof ClientService.deleteClient).toBe("function");
    })
})