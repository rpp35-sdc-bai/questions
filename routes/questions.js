const express = require('express');
const model = require('../database/model.js');
const controllers = require('../database/controllers.js');

const router = express.Router();

router.get('/qa/questions', async (req, res, next) => {
  const result = await controllers.getQuestions(req);
  res.send(result)
  // res.send('hello')

})

module.exports = router;