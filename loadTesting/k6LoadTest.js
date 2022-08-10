import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  // stages: [
  //   { duration: '30s', target: 1 },
  //   { duration: '30s', target: 1 },
  // ],
  // stages: [
  //   { duration: '30s', target: 15 },
  //   { duration: '30s', target: 15 },
  //   { duration: '30s', target: 15 },
  //   { duration: '30s', target: 0 },
  // ],
  // stages: [
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 150 },
  //   { duration: '30s', target: 100 },
  //   { duration: '30s', target: 0 },
  // ],
   stages: [
    { duration: '1s', target: 70 },
    { duration: '59s', target: 70 },
   ],
  // ext: {
  //   loadimpact: {
  //     projectID: 3593732,
  //     // Test runs with the same name groups test runs together
  //     name: "questions route 1000 RPS load"
  //   }
  // }
};

export default function () {
  const res = http.get('http://localhost:3000/qa/questions/3000001/answers');
  sleep(1);
}
