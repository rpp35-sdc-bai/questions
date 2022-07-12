const express = require('express');
const model = require('../database/model.js');
const controllers = require('../database/controllers.js');

const router = express.Router();

router.get('/qa/questions', async (req, res, next) => {
  const result = await controllers.getQuestions(req);
  res.send(result);
})

router.get('/qa/questions/:question_id/answers', async (req, res, next) => {
  const result = await controllers.getAnswers(req);
  res.send(result);
})

router.post('/qa/questions', async (req, res, next) => {
  const {body, name, email, product_id} = req.body;
  const result = await model.addQuestions(product_id, body, name, email);
  res.sendStatus(201);
})

module.exports = router;