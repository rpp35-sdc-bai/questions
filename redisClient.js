const redis = require('redis');

const redisClient = redis.createClient({
  url: 'redis://default@ec2-18-144-23-229.us-west-1.compute.amazonaws.com:6379'
});

module.exports = redisClient;