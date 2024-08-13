import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const API_URL = "http://54.254.214.239:80/api/news";
const HEADER = {
  headers: {
    "X-API-TOKEN": "0554d048-55ce-4212-96b5-807b15790bca",
  },
};
const DATA = {
  title: "testnews",
  description: "This is test Desc",
  document_link: "empty",
};

export const options = {
  stages: [
    { duration: "50s", target: 10 },
    { duration: "50s", target: 10 },
    { duration: "50s", target: 50 },
    { duration: "50s", target: 50 },
    { duration: "50s", target: 100 },
    { duration: "50s", target: 100 },
  ],
  // Output results to CSV
};

export default function () {
  // Make a request to your API
  let response = http.post(API_URL, DATA, HEADER);

  // Check the response status
  check(response, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}
