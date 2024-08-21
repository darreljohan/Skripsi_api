import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const API_URL = "http://172.31.39.255:80/api/assets/format/1";
const HEADER = {
  headers: {
    "X-API-TOKEN": "1c936f8e-0048-4550-a119-b8ce5e0a11f7",
  },
};

export const options = {
  cloud: {
    // Project: Load Testing
    projectID: 3710305,
    // Test runs with the same name groups test runs together.
    name: "Micro asset",
  },
  stages: [
    { duration: "2ms", target: 10 },
    { duration: "300s", target: 10 },
    { duration: "2ms", target: 20 },
    { duration: "300s", target: 20 },
    { duration: "2ms", target: 30 },
    { duration: "300s", target: 30 },
    { duration: "2ms", target: 40 },
    { duration: "300s", target: 40 },
    { duration: "2ms", target: 50 },
    { duration: "300s", target: 50 },
    { duration: "2ms", target: 60 },
    { duration: "300s", target: 60 },
    { duration: "2ms", target: 70 },
    { duration: "300s", target: 70 },
    { duration: "2ms", target: 80 },
    { duration: "300s", target: 80 },
    { duration: "2ms", target: 90 },
    { duration: "300s", target: 90 },
    { duration: "2ms", target: 100 },
    { duration: "300s", target: 100 },
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
