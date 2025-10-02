module.exports = {
  type: "object",
  required: ["temperature", "humidity", "wind", "pressure"],
  properties: {
    temperature: { type: "number" },
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
