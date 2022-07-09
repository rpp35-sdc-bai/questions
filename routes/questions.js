const express = require('express');
const model = require('../database/model.js');

const router = express.Router();

router.get('/qa/questions', async (req, res, next) => {
  const result = await model.getQuestions(2, 3, 3);
  res.send(result.rows)
  // res.send('hello')

})

module.exports = router;