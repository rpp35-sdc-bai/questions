require('dotenv').config()
const express = require('express');
const init = require('./database/index.js');

const app = express()

const port = process.env.PORT || 5000;

// make sure you have accept application/json in your headers
// or else you will have no body in your requests
app.use(express.json())

app.use(require('./routes/questions'))

if (process.env.INIT === 'true') {
  init();
}

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`listening on ${port}`)
  })
}

module.exports = app;
