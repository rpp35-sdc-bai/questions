require('newrelic');
require('dotenv').config()
const express = require('express');
const init = require('./database/index.js');
const redisClient = require('./redisClient.js');

const app = express()

const port = process.env.PORT || 5000;

// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

app.use(require('./routes/questions'))

app.get('/loaderio-ecd204132cb1eed3bc063cabaecb31d5', (req, res) => {
  res.send('loaderio-ecd204132cb1eed3bc063cabaecb31d5');
})

if (process.env.INIT === 'true') {
  init();
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, async () => {
    await redisClient.connect();
    console.log('redis connected')
    console.log(`listening on ${port}`)
  })
}

module.exports = app;
