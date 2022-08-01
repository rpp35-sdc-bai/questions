const redis = require('redis');

const redisClient = redis.createClient({
  socket: {
      host: 'localhost',
      port: 6379
  },
  password: ''
});

module.exports = redisClient;