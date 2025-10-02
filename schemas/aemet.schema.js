module.exports = {
  type: "object",
  required: ["temp", "humidity", "wind", "pressure"],
  properties: {
    temp: { type: "number" },
    humidity: { type: "number" },
    wind: {
      type: "object",
      required: ["speed", "direction"],
      properties: {
        speed: { type: "number" },
        direction: { type: "string" }
      }
    },
    pressure: { type: "number" }
  }
};
