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
const windStations = require("../data/stations.json");