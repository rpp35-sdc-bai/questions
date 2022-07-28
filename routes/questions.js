const express = require('express');
const model = require('../database/model.js');
const controllers = require('../database/controllers.js');

const router = express.Router();

router.get('/test', async (req, res) => {
  res.send('hello world')
})

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

router.post('/qa/questions/:question_id/answers', async (req, res, next) => {
  const {question_id} = req.params;
  const {body, name, email, photos} = req.body;
  const result = await model.addAnswers(question_id, body, name, email, photos);
  res.sendStatus(201);
})

router.put('/qa/questions/:question_id/helpful', async(req, res, next) => {
  const {question_id} = req.params;
  const result = await model.updateQuestionHelpful(question_id);
  res.sendStatus(204);
})

router.put('/qa/questions/:question_id/report', async(req, res, next) => {
  const {question_id} = req.params;
  const result = await model.updateQuestionReport(question_id);
  res.sendStatus(204);
})

router.put('/qa/answers/:answer_id/helpful', async(req, res, next) => {
  const {answer_id} = req.params;
  const result = await model.updateAnswerHelpful(answer_id);
  res.sendStatus(204);
})

router.put('/qa/answers/:answer_id/report', async(req, res, next) => {
  const {answer_id} = req.params;
  const result = await model.updateAnswerReport(answer_id);
  res.sendStatus(204);
})
module.exports = router;
