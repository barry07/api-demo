const request = require("supertest");
const { expect } = require("chai");

const baseURL = "https://api.oceandrivers.com";
const stations = require("../data/stations.json");

describe("ODWeather API — getAemetStation - Endpoint", () => {
  stations.validStations.forEach((stationId) => {
    it(`should return station data for valid station ${stationId}`, async () => {
      const res = await request(baseURL)
        .get(`/weather/aemetstation/${stationId}/lastdata/`);

      expect(res.status).to.equal(200);
    });
  });
});
