// test/setup.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
// Make expect globally available
global.expect = chai.expect;


require('dotenv').config();
const BASE_URL = process.env.BASE_URL?.replace(":443", ""); // strip :443 if present

if (!BASE_URL) {
  throw new Error("❌ BASE_URL not found in .env");
}

const defaultHeaders = {
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  "Accept": "application/json,text/html;q=0.9",
  "Accept-Language": "en-US,en;q=0.9",
};

module.exports = {
  BASE_URL,
  defaultHeaders,
};


