export default class Layer {
  /**
   * @param {Object} config
   * @param {number} config.priority
   * @param {string} config.view
   * @param {MapObject} config.mapObj
   */
  constructor(config) {
    this._priority = config.priority;
    this._view = config.view;
    this._mapObj = config.mapObj;
    this._layer = [];
  }

  get priority() {
    return this._priority;
  }

  get view() {
    return this._view;
  }

  get layer() {
    return this._layer;
  }

  get mapWidth() {
    return this._mapObj.width;
  }

  get mapHeight() {
    return this._mapObj.height;
  }
}
