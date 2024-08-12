import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const mockFile = open("./mock-file.jpg", "b");

const API_URL = "http://localhost:10601/api/file";
const HEADER = {
  headers: {
    "X-API-TOKEN": "e8cf4f73-5664-44b4-8081-309e7bcdbbc1",
  },
};
const DATA = {
  id: 1,
  file: http.file(mockFile, "mocking.jpg"),
};

export const options = {
  stages: [
    { duration: "1s", target: 100 },
    { duration: "1m", target: 100 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 200 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 300 },
    { duration: "1m", target: 400 },
    { duration: "1m", target: 400 },
    { duration: "1m", target: 500 },
    { duration: "1m", target: 500 },
    { duration: "1m", target: 600 },
    { duration: "1m", target: 600 },
    { duration: "1m", target: 700 },
    { duration: "1m", target: 700 },
    { duration: "1m", target: 800 },
    { duration: "1m", target: 800 },
    { duration: "1m", target: 900 },
    { duration: "1m", target: 900 },
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
