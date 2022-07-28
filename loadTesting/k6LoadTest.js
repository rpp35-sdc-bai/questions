import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
   stages: [
     { duration: '30s', target: 1 },
     { duration: '30s', target: 1 },
   ],
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
  //stages: [
  //  { duration: '30s', target: 5000 },
  //  { duration: '30s', target: 10000 },
  //  { duration: '30s', target: 5000 },
  //  { duration: '30s', target: 0 },
  //],
  // ext: {
  //   loadimpact: {
  //     projectID: 3593732,
  //     // Test runs with the same name groups test runs together
  //     name: "questions route 1000 RPS load"
  //   }
  // }
};

export default function () {
  const res = http.get('http://ec2-13-57-38-131.us-west-1.compute.amazonaws.com:5000/qa/questions?product_id=896571');
  sleep(1);
}
