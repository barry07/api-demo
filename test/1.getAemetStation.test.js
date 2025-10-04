const request = require('supertest');
const chai = require('chai');


const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getAemetStation/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import station IDs from external file
const stations = require("../data/stations.json");

describe('ODWeather API - getAemetStation - endpoint', () => {
  stations.validStations.forEach((stationId) => {
    it(`should return 200 response for valid station ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`);

      expect(res.status).to.equal(200);

      // The response is expected to be an object
      expect(res.body).to.be.an('object');
    });
  });
});
