// load the environment variable from .env file
require("dotenv").config();


const request = require("supertest");
const { expect } = require("chai");

// Retrieve the base URL from environment variables
const BASE_URL = process.env.BASE_URL;

// Define the rest of the fixed API path
const API_PREFIX = "/v1.0/getAemetStation/";

// Check if the BASE_URL was loaded correctly
if (!BASE_URL) {
  throw new Error("BASE_URL not found. Ensure it is defined in your .env file.");
}

// Import test data
const stations = require("../data/stations.json");

describe("ODWeather API — getAemetStation - Endpoint", () => {
  stations.validStations.forEach((stationId) => {
    it(`should return 200 OK for a valid station ID: ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`) 

      expect(res.status).to.equal(200);
      expect(res.body).to.be.an("object"); // sanity check
    });
  });

  stations.invalidStations.forEach((stationId) => {
    it(`should return 404 for an invalid station ID: ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}${stationId}/lastdata/`) 

      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object"); 
    });

    it(`should return 404 for an missing station ID: ${stationId}`, async () => {
      const res = await request(BASE_URL)
        .get(`${API_PREFIX}/lastdata/`) 

      expect(res.status).to.equal(404);
      expect(res.body).to.be.an("object"); 
    });
  });
});

