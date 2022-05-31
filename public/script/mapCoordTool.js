class Mapper {
  constructor() {
    this._coords = [];
    this._isMapping = false;
    this._features = [];
  }

  static featureTemplate = (name, coords) => ({
    type: "Feature",
    properties: {
      name,
      openTime: {
        open: 510,
        close: 1230,
      },
    },
    geometry: {
      type: "Polygon",
      coordinates: [coords],
    },
  });

  _startMapping() {
    this._coords.length = 0;
  }

  _stopMapping() {
    const name = "";
    const newFeature = Mapper.featureTemplate(name, [...this._coords]);
    this._features.push(newFeature);
  }

  addCoord(newCoord) {
    this._coords.push(newCoord);
  }

  get lastFeature() {
    return this._features[this._features.length - 1];
  }

  get features() {
    return this._features;
  }

  switch() {
    this._isMapping ? this._stopMapping() : this._startMapping();
    this._isMapping = !this._isMapping;
  }
}

const mapper = new Mapper();

map.addEventListener("contextmenu", ({ latlng: { lat, lng } }) => {
  mapper.addCoord([lng, lat]);
});

document.addEventListener("keydown", ({ key }) => {
  console.log(key);
  const action = {
    s: () => mapper.switch(),
    c: () => navigator.clipboard.writeText(JSON.stringify(mapper.lastFeature)),
    a: () => navigator.clipboard.writeText(JSON.stringify(mapper.features)),
  };
  action[key]?.();
});
