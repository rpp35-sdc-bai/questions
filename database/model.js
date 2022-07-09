const {Pool} = require('pg');

const pool = new Pool({
  user: 'xuenjie',
  host: 'localhost',
  database: 'questions',
  password: '',
  port: '5432',
})

module.exports = {
  getQuestions: async (product_id, count = 5, page = 1) => {
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
    const query = `SELECT id as question_id, body, date_written, asker_name, asker_email, reported, helpful FROM question WHERE product_id = ${product_id} LIMIT ${count} OFFSET ${toOffset};`;
    const result = await client.query(query);
    client.release();
    return result;
  }
}