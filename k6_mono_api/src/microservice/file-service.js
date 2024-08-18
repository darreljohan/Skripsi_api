import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const mockFile = open("./mock-file.jpg", "b");

const API_URL = "http://47.129.192.138:80/api/file";
const HEADER = {
  headers: {
    "X-API-TOKEN": "b63d314c-ad54-4059-8e78-680e0ac5bd58",
  },
};
const DATA = {
  id: 6,
  file: http.file(mockFile, "mocking.jpg"),
};

export const options = {
  cloud: {
    // Project: Load Testing
    projectID: 3709926,
    // Test runs with the same name groups test runs together.
    name: "Micro File",
  },
  stages: [
    { duration: "2ms", target: 20 },
    { duration: "120s", target: 20 },
    { duration: "2ms", target: 40 },
    { duration: "120s", target: 40 },
    { duration: "2ms", target: 60 },
    { duration: "120s", target: 60 },
    { duration: "2ms", target: 80 },
    { duration: "120s", target: 80 },
    { duration: "2ms", target: 100 },
    { duration: "120s", target: 100 },
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
  sleep(0.5);
}
