const app = require('./server.js');
const request = require('supertest');

describe('Initial test skeleton', () => {
  test('should return sample text for requests along base questions routes', async () => {
    try {
      const response = await request(app).get('/qa/questions').set('Accept', 'application/json');
      expect(response.text).toBe('list of questions');
    } catch(error) {
      console.log(error);
    }
  })

});