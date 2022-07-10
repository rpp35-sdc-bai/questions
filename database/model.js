const {Pool} = require('pg');

const pool = new Pool({
  user: 'xuenjie',
  host: 'localhost',
  database: 'questions',
  password: '',
  port: '5432',
})

module.exports = {
  readQuestions: async (product_id, count = 5, page = 1) => {
    const client = await pool.connect();
    // let nums = '';
    // let start = (count * page) - (count * (page - 1)) + 1;
    // let end = count * page;
    // for (let i = start; i < end; i++) {
    //   if (i === end) {
    //     nums += i;
    //   } else {
    //     nums += i + ',';
    //   }
    // }
    if (page === 1) {
      toOffset = 0;
    } else {
      toOffset = count * page - (count * (page - 1))
    }
    const query = `SELECT id as question_id, body as question_body, date_written as question_date, asker_name, helpful as question_helpfulness, reported FROM question WHERE product_id = ${product_id} LIMIT ${count} OFFSET ${toOffset};`;
    const result = await client.query(query);
    client.release();
    return result;
  },

  readAnswers: async(question_id, count = 5, page = 1) => {
    const client = await pool.connect();
    if (page === 1) {
      toOffset = 0;
    } else {
      toOffset = count * page - (count * (page - 1))
    }
    const query = `SELECT id as answer_id, body, date_written as date, answerer_name, helpful as helpfulness FROM answer WHERE question_id = ${question_id} LIMIT ${count} OFFSET ${toOffset};`;
    const result = await client.query(query);
    client.release();
    return result;
  },

  readPhotos: async(answer_id) => {
    const client = await pool.connect();
    const query = `SELECT id, url FROM photo WHERE answer_id = ${answer_id};`;
    const result = await client.query(query);
    client.release();
    return result;
  }
}