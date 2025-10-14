const request = require("supertest");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getAemetStation/";

describe("ODWeather API - getAemetStation - endpoint", function () {
  //this.timeout(10000);

  // Valid Stations
  for (const stationId of stations.validStations) {
    it(`should return 200 OK and valid data for station "${stationId}"`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`)
        .set(defaultHeaders);
        console.log((`${BASE_URL}${API_PREFIX}${stationId}/lastdata/`))

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object");
    });
  }
});
