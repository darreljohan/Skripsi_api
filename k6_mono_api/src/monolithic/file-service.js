import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const mockFile = open("./mock-file.jpg", "b");

const API_URL = "http://54.255.216.3:80/api/file";
const HEADER = {
  headers: {
    "X-API-TOKEN": "f7adaaee-c627-449d-82ca-488cf1a05236",
  },
};
const DATA = {
  id: 6,
  file: http.file(mockFile, "mocking.jpg"),
};

export const options = {
  cloud: {
    // Project: Load Testing
    projectID: 3709569,
    // Test runs with the same name groups test runs together.
    name: "Mono File",
  },
  stages: [
    { duration: "2ms", target: 20 },
    { duration: "90s", target: 20 },
    { duration: "2ms", target: 40 },
    { duration: "90s", target: 40 },
    { duration: "2ms", target: 60 },
    { duration: "90s", target: 60 },
    { duration: "2ms", target: 80 },
    { duration: "90s", target: 80 },
    { duration: "2ms", target: 100 },
    { duration: "90s", target: 100 },
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
