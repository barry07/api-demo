const request = require('supertest');

const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getSocibWeatherStation/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import station IDs from external file
const stations = require("../data/stations.json");

describe('ODWeather API - getSocibWeatherStation - endpoint', function () {
  this.timeout(10000); 

  stations.validBouyStations.forEach((stationId) => {
    it(`should return 200 response for valid bouy stations ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/latestdata/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
    });

  stations.invalidStations.forEach((stationId) => {
    it(`should return 404 response for invalid bouy stations ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/latestdata/`);

      await expect(responsePromise).to.eventually.have.property('status', 404);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
    });
});