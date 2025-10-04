// test/setup.js
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
require('dotenv').config();

chai.use(chaiAsPromised);

// Make expect globally available
global.expect = chai.expect;
