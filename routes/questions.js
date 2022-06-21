const express = require('express');

const router = express.Router();

router.get('/qa/questions', (req, res, next) => {
  res.send('list of questions');
})

module.exports = router;