const request = require('supertest');
const app = require('./app');
const fs = require('fs').promises;

describe('My Test', () => {
  it('the server should be able to add tickets to the json file', async () => {
    const data = {
      id: '1111-1111-111-111',
      title: 'Test',
      content: 'Test',
      userEmail: 'Test',
      creationTime: 1525545111161,
    };
    const firstRes = await request(app).get('/api/tickets');
    await request(app).post('/api/tickets').send(data);
    const secondRes = await request(app).get('/api/tickets');
    expect(firstRes.body.length).toBe(secondRes.body.length - 1);
    expect(secondRes.body[secondRes.body.length - 1]).toMatchObject(data);
  });
});
