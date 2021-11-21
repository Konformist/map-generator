import { getRandomIntInclusive } from '../utils/utils.js';
import { EMPTY, WOOD } from '../variables.js';
import Layer from './Layer.js';

export default class Forest extends Layer {
  /**
   * @param {MapObject} mapObj
   * @param {Object} config
   * @param {string} [config.view]
   */
  constructor(mapObj, config = {}) {
    super({
      priority: 2,
      view: config.view || WOOD,
      mapObj,
    });
    this.generate();
  }

  generate() {
    const map = [];

    let positionX = getRandomIntInclusive(this._mapObj.minX, this._mapObj.maxX);
    let positionY = getRandomIntInclusive(this._mapObj.minY, this._mapObj.maxY);
    let width = getRandomIntInclusive(this._mapObj.minX, Math.floor(this.mapWidth / 2));
    let height = getRandomIntInclusive(this._mapObj.minY, Math.floor(this.mapHeight / 2));

    const heightHalf = Math.floor(height / 2);

    if (positionY - heightHalf < this._mapObj.minY) {
      positionY += heightHalf - positionY;
    } else if (positionY + heightHalf > this._mapObj.maxY) {
      positionY += (positionY + heightHalf) - (this._mapObj.maxY);
    }

    const heightStart = this._mapObj.normalizeByY(positionY - heightHalf);
    const heightEnd = this._mapObj.normalizeByY(positionY + heightHalf);

    for (let i = 0; i < this.mapHeight; i++) {
      const row = [];
      const start = this._mapObj.normalizeByX(positionX - Math.floor(width / 2));
      const end = this._mapObj.normalizeByX(positionX + Math.floor(width / 2));

      for (let j = 0; j < this.mapWidth; j++) {
        if (i >= heightStart && i <= heightEnd) {
          row.push(j >= start && j <= end ? this._view : EMPTY);
        } else {
          row.push(EMPTY);
        }
      }

      positionX = getRandomIntInclusive(this._mapObj.normalizeByX(positionX - 1), this._mapObj.normalizeByX(positionX + 1));
      width = getRandomIntInclusive(this._mapObj.normalizeByX(width - 2), this._mapObj.normalizeByX(width + 2));

      map.push(row);
    }

    this._layer = map;
  }
}
