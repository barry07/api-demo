const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
require("dotenv").config();

const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getEasyWind/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import station IDs from external file
const windStations = require("../data/windStations.json");

describe('Easy Wind API', function () {
  this.timeout(10000); // give API time to respond

  windStations.validStations.forEach((stationId) => {
    it(`should return 200 response for valid stations ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/?period=latestdata/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});

    windStations.invalidStations.forEach((stationId) => {
    it(`should return 404 response for invalid stations ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/?period=latestdata/`);

      await expect(responsePromise).to.eventually.have.property('status', 404);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
  });

windStations.validPeriods.forEach((period) => {
    it(`should return 200 response for valid periods ${period}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}EW013/?period=${period}/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});

windStations.invalidPeriods.forEach((period) => {
    it(`should return 404 response for invalid periods ${period}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}EW013/?period=${period}/`);

      await expect(responsePromise).to.eventually.have.property('status', 404);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});

});
