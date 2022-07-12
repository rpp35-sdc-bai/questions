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
        product_id: '' + product_id,
        results: questions
      }
      return result;
    } catch (err) {
      return err;
    }
  },

  getAnswers: async (req) => {
    const {question_id} = req.params;
    const {page, count} = req.query;
    try{
      const aResult = await model.readAnswers(question_id);
      let answers = aResult.rows;
      for (let i = 0; i < answers.length; i++) {
        const pResult = await model.readPhotos(answers[i].answer_id);
        let photos = pResult.rows;
        answers[i].photos = photos;
      }
      let result = {
        question: question_id,
        page: page ? page: 1,
        count: count ? count: 5,
        results: answers
      }
      return result;
    } catch (err) {
      return err;
    }
  }
}