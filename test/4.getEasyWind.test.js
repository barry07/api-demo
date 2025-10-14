const request = require("supertest");
const { BASE_URL, defaultHeaders } = require("./setup");
const stations = require("../data/stations.json");

const API_PREFIX = "/v1.0/getEasyWind/";

describe('ODWeather API - getEasyWind - endpoint', function () {

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
