module.exports = {
  type: "object",
  required: [
    "idema", "ubi", "lon", "lat", "fint",
    "tamin", "ta", "tamax", "hr", "pres"
  ],
  properties: {
    idema: { type: "string" },
    ubi: { type: "string" },
    lon: { type: "number" },
    lat: { type: "number" },
    fint: { type: "string" },
    prec: { type: "number" },
    alt: { type: "number" },
    vmax: { type: "number" },
    vv: { type: "number" },
    dv: { type: "number" },
    dmax: { type: "number" },
    tamin: { type: "number" },
    ta: { type: "number" },
    tamax: { type: "number" },
    hr: { type: "number" },
    st: { type: "number" },
    pres: { type: "number" },
    pres_nmar: { type: "number" }
  }
};
