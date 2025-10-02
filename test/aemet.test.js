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
    const responsePromise = request('https://api.oceandrivers.com')
      .get('/v1.0/getAemetStation/aeropuertopalma/lastdata');

    await expect(responsePromise).to.eventually.have.property('status', 200);

    const res = await responsePromise;
    expect(res.body).to.be.an('array');

    const validate = ajv.compile(aemetSchema);
    const valid = validate(res.body[0]);

    if (!valid) {
      console.error('Schema validation errors:', validate.errors);
    }

    expect(valid).to.be.true;
  });
});