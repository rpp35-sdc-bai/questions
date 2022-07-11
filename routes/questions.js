const express = require('express');
const model = require('../database/model.js');
const controllers = require('../database/controllers.js');

const router = express.Router();

router.get('/qa/questions', async (req, res) => {
  const result = await controllers.getQuestions(req);
  res.send(result);
})

router.get('/qa/questions/:question_id/answers', async (req, res) => {
  const result = await controllers.getAnswers(req);
  res.send(result);
})

module.exports = router;