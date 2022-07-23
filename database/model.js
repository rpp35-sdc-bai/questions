const {Pool} = require('pg');

// const pool = new Pool({
//   user: 'xuenjie',
//   host: 'localhost',
//   database: 'questions',
//   password: '',
//   port: '5432',
// })

const pool = new Pool({
  user: 'xuenjie',
  host: 'ec2-52-53-160-9.us-west-1.compute.amazonaws.com',
  database: 'postgres',
  password: 'password',
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
  },

  addQuestions: async(product_id, body, name, email) => {
    const client = await pool.connect();
    const date_written = new Date().getTime();
    const [reported, helpful]= [0, 0];
    const query = `INSERT INTO question (product_id, body, date_written, asker_name, asker_email, reported, helpful)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)
                   RETURNING *;`;
    const values = [product_id, body, date_written, name, email, reported, helpful];
    try {
      result = await client.query(query, values);
      console.log('added a qustion', result.rows[0])
    } catch (err) {
      console.log(err);
    }
  },

  addAnswers: async(question_id, body, name, email, photos) => {
    const client = await pool.connect();
    const date_written = new Date().getTime();
    const [reported, helpful] = [0, 0];
    const query = `INSERT INTO answer (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
                   VALUES ($1, $2, $3, $4, $5, $6, $7)
                   RETURNING *;`;
    const values = [question_id, body, date_written, name, email, reported, helpful];
    try {
      const result = await client.query(query, values);
      console.log('added an answer', result.rows[0]);
      const answer_id = result.rows[0].id;
      const pQuery = `INSERT INTO photo (answer_id, url) VALUES ($1, $2) RETURNING *;`;
      for (let i = 0; i < photos.length; i ++) {
        const pResult = await client.query(pQuery, [answer_id, photos[i]]);
        console.log('added a photo', pResult.rows[0]);
      }
    } catch (err) {
      console.log(err);
    }
  },

  updateQuestionHelpful: async(question_id) => {
    const client = await pool.connect();
    const query = `UPDATE question SET helpful = helpful + 1 WHERE id = $1 RETURNING *;`;
    const values = [question_id];
    try{
      const result = await client.query(query, values);
      console.log(result.rows[0]);
    } catch(err) {
      console.log(err);
    }
  },

  updateQuestionReport: async(question_id) => {
    const client = await pool.connect();
    const query = `UPDATE question SET reported = 1 WHERE id = $1 RETURNING *;`;
    const values = [question_id];
    try{
      const result = await client.query(query, values);
      console.log(result.rows[0]);
    } catch(err) {
      console.log(err);
    }
  },

  updateAnswerHelpful: async(answer_id) => {
    const client = await pool.connect();
    const query = `UPDATE answer SET helpful = helpful + 1 WHERE id = $1 RETURNING *;`;
    const values = [answer_id];
    try{
      const result = await client.query(query, values);
      console.log(result.rows[0]);
    } catch(err) {
      console.log(err);
    }
  },

  updateAnswerReport: async(answer_id) => {
    const client = await pool.connect();
    const query = `UPDATE answer SET reported = 1 WHERE id = $1 RETURNING *;`;
    const values = [answer_id];
    try{
      const result = await client.query(query, values);
      console.log(result.rows[0]);
    } catch(err) {
      console.log(err);
    }
  }
}