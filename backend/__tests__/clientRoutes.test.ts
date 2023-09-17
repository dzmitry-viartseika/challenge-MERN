import request from 'supertest'
import app from '../index'

const MOCK_RESPONSE = {
    clients: [] as any,
    currentPage: 1,
    pageSize: 10,
    totalCount: 0,
    totalPage: 0,
}

describe('Server.ts tests', () => {
    it('Math test', async () => {
        // const res = await request(app).get('/api/clients/')
        expect(true).toBeTruthy();
    })
})
