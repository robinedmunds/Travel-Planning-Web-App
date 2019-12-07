/**
 * @jest-environment node
 */

"use strict";

const request = require("supertest");
const app = require("../../src/server/app");

describe("Test express server routes.", () => {

  test("Route '/'", () => {
    const output = 200;

    return request(app).get("/").then((response) => {
      expect(response.statusCode).toBe(output);
    });
  });

  test("Test for 200 on VALID POST data, '/api/travel-card'", () => {
    const postData = {
      destination: "London, UK",
      departDate: "2020-12-20"
    };
    const output = 200;

    return request(app).post("/api/travel-card").send(postData).set("Accept", "application/json").then((response) => {
      expect(response.statusCode).toBe(output);
    });
  });

  test("Test for 4xx on INVALID POST data, '/api/travel-card'", () => {
    const postData = [
      {
        destination: "London, UK",
        departDate: ""
      },
      {
        destination: "",
        departDate: "2020-12-20"
      },
      {
        destination: "",
        departDate: "2020-12-50"
      },
      {}
    ];

    const output = 400;

    for (let i of postData) {
      return request(app).post("/api/travel-card").send(i).set("Accept", "application/json").then((response) => {
        expect(response.statusCode).toBe(output);
      });
    };
  });

});
