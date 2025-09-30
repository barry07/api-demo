const request = require("supertest");
const { expect } = require("chai");
const { baseURL, authToken } = require("./config");

describe("ODWeather API — getAemetStation", () => {
  it("should return station data for valid station", async () => {
    // adjust path and query param names to match the real API
    const stationId = "12345";  
    const res = await request(baseURL)
      .get("/ODWeather/getAemetStation")
      .query({ stationId })        // or .get(`/ODWeather/getAemetStation/${stationId}`) depending on API
      .set("Authorization", `Bearer ${authToken}`);  // if auth is required

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("object");
    // validate some properties in the response
    expect(res.body).to.have.property("stationId", stationId);
    expect(res.body).to.have.property("location");
    expect(res.body.location).to.have.keys(["latitude", "longitude"]);
  });

  it("should return 400 or suitable error for missing stationId", async () => {
    const res = await request(baseURL)
      .get("/ODWeather/getAemetStation")
      .set("Authorization", `Bearer ${authToken}`);

    // Expecting an error status (400 / 422 / etc)
    expect(res.status).to.be.oneOf([400, 422]);
    // Optionally, if API returns an error message body, assert on that
    expect(res.body).to.have.property("error");
  });

  it("should return 404 for non-existent station", async () => {
    const invalidStation = "nonexistent123";
    const res = await request(baseURL)
      .get("/ODWeather/getAemetStation")
      .query({ stationId: invalidStation })
      .set("Authorization", `Bearer ${authToken}`);

    // maybe 404, or another error code per spec
    expect(res.status).to.equal(404);
    expect(res.body).to.have.property("error");
  });
});
