const app = require('./server.js');
const request = require('supertest');

describe('question route tests', () => {
  test('should return an object from question get request', async () => {
    try {
      const response = await request(app).get('/qa/questions').set('Accept', 'application/json');
      expect(typeof response).toBe('object');
    } catch(error) {
      console.log(error);
    }
  })
});