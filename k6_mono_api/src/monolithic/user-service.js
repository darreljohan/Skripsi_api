import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const API_URL = "http://18.143.177.181:80/api/users/current";
const HEADER = {
  headers: {
    "X-API-TOKEN": "86dc1a11-89ed-4e0e-bb9a-b29e322323e2",
  },
};

export const options = {
  stages: [
    { duration: "1s", target: 10 },
    { duration: "3s", target: 10 },
    { duration: "20s", target: 30 },
    { duration: "20s", target: 30 },
    { duration: "20s", target: 50 },
    { duration: "20s", target: 50 },
    { duration: "20s", target: 70 },
    { duration: "20s", target: 70 },
    { duration: "20s", target: 100 },
    { duration: "20s", target: 100 },
  ],
  // Output results to CSV
};

export default function () {
  // Make a request to your API
  let response = http.get(API_URL, HEADER);

  // Check the response status
  check(response, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(1);
}
