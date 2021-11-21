import { SOIL } from '../variables.js';
import Layer from './Layer.js';

export default class Soil extends Layer {
  /**
   * @param {MapObject} mapObj
   * @param {Object} config
   * @param {string} [config.view]
   */
  constructor(mapObj, config = {}) {
    super({
      priority: 1,
      view: config.view || SOIL,
      mapObj,
    });
    this.generate();
  }

  generate() {
    const map = [];

    for (let i = 0; i < this.mapHeight; i++) {
      const row = [];

      for (let j = 0; j < this.mapWidth; j++) {
        row.push(this._view);
      }

      map.push(row);
    }

    this._layer = map;
  }
}
