import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const mockFile = open("./mock-file.jpg", "b");

const API_URL = "http://18.143.177.181:80/api/file";
const HEADER = {
  headers: {
    "X-API-TOKEN": "ba66e5bb-a06a-4a70-af0f-ebe17a59700e",
  },
};
const DATA = {
  id: 1,
  file: http.file(mockFile, "mocking.jpg"),
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
  let response = http.post(API_URL, DATA, HEADER);

  // Check the response status
  check(response, {
    "is status 200": (r) => r.status === 200,
  });
  sleep(1);
}
