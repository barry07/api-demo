const request = require('supertest');

const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getEasyWind/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import station IDs from external file
const stations = require("../data/stations.json");

describe('Easy Wind API', function () {
  this.timeout(10000); // give API time to respond

  stations.validWindStations.forEach((stationId) => {
    it(`should return 200 response for valid stations ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/?period=latestdata/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});

    stations.invalidStations.forEach((stationId) => {
    it(`should return error for an invalid station ${stationId}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/?period=latestdata/`);
        
      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.match(/not implemented/i);
    });
  });

stations.validPeriods.forEach((period) => {
    it(`should return 200 response for valid periods ${period}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}EW013/?period=${period}/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      // Basic sanity check
      expect(res.body).to.be.an('object');
    });
});

stations.invalidPeriods.forEach((period) => {
    it(`should return error for invalid periods ${period}`, async () => {
      const responsePromise = request(BASE_URL)
        .get(`${API_PREFIX}EW013/?period=${period}/`);

      await expect(responsePromise).to.eventually.have.property('status', 200);

      const res = await responsePromise;

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('error');
      expect(res.body.error).to.match(/not implemented/i);
    });
});

});
