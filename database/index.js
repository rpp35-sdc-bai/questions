const {Client} = require('pg');

module.exports = async function init () {
  // const client = new Client({
  //   user: 'xuenjie',
  //   host: 'localhost',
  //   database: 'questions',
  //   password: '',
  //   port: '5432',
  // });

  const client = new Client({
    user: 'xuenjie',
    host: 'ec2-52-53-160-9.us-west-1.compute.amazonaws.com',
    database: 'postgres',
    password: 'password',
    port: '5432',
  });

  client.connect()
  .then(() => console.log('connected to db'))
  .catch(err => console.log(err))

  //Drop and create question table
  await client.query('DROP TABLE IF EXISTS question CASCADE;')
  await client.query(`CREATE TABLE question (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    product_id INT NOT NULL,
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
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
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
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    answer_id INT NOT NULL,
    url VARCHAR(1000) NULL,
    CONSTRAINT fk_quesitons
      FOREIGN KEY(answer_id) REFERENCES answer(id)
  );`)

  const result = await Promise.all([
    client.query("COPY question from '/Users/xuenjie/questions/data/questions.csv' DELIMITER ',' CSV HEADER;"),
    client.query("COPY answer from '/Users/xuenjie/questions/data/answers.csv' DELIMITER ',' CSV HEADER;"),
    client.query("COPY photo from '/Users/xuenjie/questions/data/answers_photos.csv' DELIMITER ',' CSV HEADER;"),
  ])

  const createIndices = await Promise.all([
    client.query('CREATE INDEX questions_index ON question(product_id);'),
    client.query('CREATE INDEX answers_index ON answer(question_id);'),
    client.query('CREATE INDEX photos_index ON photo(answer_id);')
  ]);

  console.log(result, 'copyed success');

  await client.end();
}