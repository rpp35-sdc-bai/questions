const {Client} = require('pg');

module.exports = async function init () {
  const client = new Client({
    user: 'xuenjie',
    host: 'localhost',
    database: 'questions',
    password: '',
    port: '5432',
  });

  client.connect()
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err))

  //Drop and create question table
  await client.query('DROP TABLE IF EXISTS question CASCADE;')
  await client.query(`CREATE TABLE question (
    id SERIAL NOT NULL PRIMARY KEY,
    prodect_id INT NOT NULL,
    body VARCHAR(1000) NOT NULL,
    date_written BIGINT,
    asker_name VARCHAR(60),
    asker_email VARCHAR(60),
    reported SMALLINT,
    helpful SMALLINT
  );`)

  //answer table
  await client.query('DROP TABLE IF EXISTS answer CASCADE;')
  await client.query(`CREATE TABLE answer (
    id SERIAL NOT NULL PRIMARY KEY,
    question_id INT NOT NULL,
    body VARCHAR(1000) NOT NULL,
    date_written BIGINT,
    answerer_name VARCHAR(60),
    answerer_email VARCHAR(60),
    reported SMALLINT,
    helpful SMALLINT,
    CONSTRAINT fk_quesitons
      FOREIGN KEY(question_id) REFERENCES question(id)
  );`)

  //photo table
  await client.query('DROP TABLE IF EXISTS photo CASCADE;')
  await client.query(`CREATE TABLE photo (
    id SERIAL NOT NULL PRIMARY KEY,
    answer_id INT NOT NULL,
    url VARCHAR(1000) NULL
  );`)

  const result = await Promise.allSettled([
    client.query("COPY question from '/Users/xuenjie/questions/data/questions.csv' DELIMITER ',' CSV HEADER;"),
    client.query("COPY answer from '/Users/xuenjie/questions/data/answers.csv' DELIMITER ',' CSV HEADER;"),
    client.query("COPY photo from '/Users/xuenjie/questions/data/answers_photos.csv' DELIMITER ',' CSV HEADER;"),
  ])

  console.log(result, 'copyed success');

  await client.end();
}