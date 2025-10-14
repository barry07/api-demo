const request = require('supertest');
const chai = require('chai');


const BASE_URL = process.env.BASE_URL;
const API_PREFIX = "/v1.0/getAemetStation/";

if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// import test data
const stations = require("../data/stations.json");

describe('ODWeather API - getAemetStation - endpoint', () => {
  stations.validStations.forEach((stationId) => {
    it(`should return 200 OK with weather data for valid station ID ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`);

      expect(res.status).to.equal(200);

      // The response is expected to be an object
      expect(res.body).to.be.an('object');
    });
  });


  stations.invalidStations.forEach((stationId) => {
    it(`should return 404 error for invalid station ID ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`);

      expect(res.status).to.equal(404);

      // The response is expected to be an object
      expect(res.body).to.be.an('object');
    });
  });

  stations.validPeriods.forEach((period) => {
    it(`should return 200 OK with weather data for valid station ID with valid period ${period}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}aeropuertopalma/${period}}/`);

      expect(res.status).to.equal(200);

      // The response is expected to be an object
      expect(res.body).to.be.an('object');
    });
  });

  stations.invalidPeriods.forEach((period) => {
    it(`should return 404 error for valid station ID with invalid period ${period}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}aeropuertopalma/${period}}/`);

      expect(res.status).to.equal(404);

      // The response is expected to be an object
      expect(res.body).to.be.an('object');
    });
  });
});
