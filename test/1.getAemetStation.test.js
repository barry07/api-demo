const request = require('supertest');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const Ajv = require('ajv');
const aemetSchema = require('../schemas/aemet.schema');

chai.use(chaiAsPromised);
const expect = chai.expect;
const ajv = new Ajv();

describe('Aemet Station API', () => {
  it('should return latest data matching schema', async () => {
    // Use the correct endpoint
    const responsePromise = request('https://api.oceandrivers.com')
      .get('/v1.0/getAemetStation/aeropuertopalma/lastdata/'); 

    // Assert HTTP status
    await expect(responsePromise).to.eventually.have.property('status', 200);

    const res = await responsePromise;

    // Response is an object containing fields, not an array
    expect(res.body).to.be.an('object');

    // Validate against schema
    const validate = ajv.compile(aemetSchema);
    const valid = validate(res.body);

    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }

    expect(valid).to.be.true;
  });
});
