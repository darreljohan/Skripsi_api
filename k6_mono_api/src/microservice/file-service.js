import http from "k6/http";
import { check, sleep } from "k6";
import { Trend } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const mockFile = open("./mock-file.jpg", "b");

const API_URL = "http://54.254.214.239:80/api/file";
const HEADER = {
  headers: {
    "X-API-TOKEN": "c376558a-a694-4d34-8d1f-bfa79580158f",
  },
};
const DATA = {
  id: 1,
  file: http.file(mockFile, "mocking.jpg"),
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
