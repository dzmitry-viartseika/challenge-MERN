import httpMocks from 'node-mocks-http';
import ClientService from "../services/clientService";

let req, res, next;

jest.mock("../models/clientModel");
next = jest.fn();

beforeEach(() => {
    req = httpMocks.createRequest();
    res = httpMocks.createResponse();
});

describe('ClientService', () => {
    describe('deleteClient method', () => {
        it('has a deleteClient method', () => {
            expect(typeof ClientService.deleteClient).toBe("function");
        })
    })
})