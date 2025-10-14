const request = require("supertest");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getAemetStation/";

describe("ODWeather API - getAemetStation - endpoint", function () {
  this.timeout(10000);

  // Valid Stations
  for (const stationId of stations.validStations) {
    it(`should return 200 OK and valid data for station "${stationId}"`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`)
        .set(defaultHeaders);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  }

  // Invalid Stations
  for (const stationId of stations.invalidStations) {
    it(`should return an error object for invalid station "${stationId}"`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`)
        .set(defaultHeaders);

      expect([200, 404]).to.include(res.status);
      expect(res.body).to.be.an("object");
      if (res.status === 200) {
        expect(res.body).to.have.property("error");
      }
    });
  }

  // Valid Periods
  for (const period of stations.validPeriods) {
    it(`should return 200 OK for valid period "${period}"`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}aeropuertopalma/${period}/`)
        .set(defaultHeaders);

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  }

  // Invalid Periods
  for (const period of stations.invalidPeriods) {
    it(`should return an error for invalid period "${period}"`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}aeropuertopalma/${period}/`)
        .set(defaultHeaders);

      expect([200, 404]).to.include(res.status);
      expect(res.body).to.be.an("object");
      if (res.status === 200) {
        expect(res.body).to.have.property("error");
      }
    });
  }
});
