const model = require('./model.js')

module.exports = {
  getQuestions: async (req) => {
    const {product_id, count, page} = req.query;
    try {
      const qResult = await model.readQuestions(product_id, count, page);
      let questions = qResult.rows;
      for(let i = 0; i < questions.length; i++) {
        const aResult = await model.readAnswers(questions[i].question_id);
        let answers = aResult.rows;
        let answersObj = {};
        for(let j = 0; j < answers.length; j++) {
          const pResult = await model.readPhotos(answers[j].answer_id);
          let photos = pResult.rows;
          answers[j].photos = photos;
          answersObj[answers[j].answer_id] = answers[j];
        }
        questions[i].answers = answersObj;
      }
      let result = {
        'product_id': '' + product_id,
        'result': questions
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  }
}