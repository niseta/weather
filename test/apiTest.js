const request = require("supertest");
const app = require("../server.js");

/**
 * Test location
 */

describe("GET /v1/location", function () {
  it("test location to get city", function (done) {
    request(app)
      .get("/v1/location")
      .expect("Content-Type", /json/)
      /* .expect(200, done); */
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        done();
      });
  });
});

/**
 * Test forecast sin ciudad
 */

describe("GET /v1/forecast", function () {
  it("test forecast to get city and 5 days weather", function (done) {
    request(app)
      .get("/v1/forecast")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.Array();
        done();
      });
  });
});

/**
 * Test forecast con ciudad (Londres)
 */

describe("GET /v1/forecast/london", function () {
  it("test forecast to get 5 days weather from London", function (done) {
    request(app)
      .get("/v1/forecast/london")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.Array();
        done();
      });
  });
});

/**
 * Test forecast con ciudad erronea (asdasdasd)
 */

describe("GET /v1/forecast/asdasd", function () {
  it("test forecast to get 5 days weather from fake city (asdasd)", function (done) {
    request(app)
      .get("/v1/forecast/asdasd")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.Array();
        done();
      });
  });
});

/**
 * Test current sin ciudad
 */

describe("GET /v1/current", function () {
  it("test current to get city and current weather", function (done) {
    request(app)
      .get("/v1/current")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.type("object");
        done();
      });
  });
});

/**
 * Test currenet con ciudad (Tokio)
 */

describe("GET /v1/current/tokyo", function () {
  it("test current to current weather from Tokyo", function (done) {
    request(app)
      .get("/v1/current/tokyo")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.type("object");
        done();
      });
  });
});

/**
 * Test current con ciudad erronea (asdasdasd)
 */

describe("GET /v1/current/asdasd", function () {
  it("test current to get 5 days weather from fake city (asdasd)", function (done) {
    request(app)
      .get("/v1/current/asdasd")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        res.body.body.should.be.type("object");
        res.body.body.city.should.be.type("string");
        res.body.body.weather.should.be.type("object");
        done();
      });
  });
});
