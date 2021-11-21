import { getRandomIntInclusive } from '../utils/utils.js';
import { EMPTY, WATER } from '../variables.js';
import Layer from './Layer.js';

export default class River extends Layer {
  /**
   * @param {MapObject} mapObj
   * @param {Object} config
   * @param {string} [config.view]
   */
  constructor(mapObj, config = {}) {
    super({
      priority: 4,
      view: config.view || WATER,
      mapObj,
    });
    this.generate();
  }

  generate() {
    const map = [];

    let positionX = getRandomIntInclusive(this._mapObj.minX, this._mapObj.maxX);
    let positionY = getRandomIntInclusive(this._mapObj.minY, this._mapObj.maxY);
    let height = getRandomIntInclusive(Math.floor(this.mapHeight / 3), this._mapObj.maxY);

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

      for (let j = 0; j < this.mapWidth; j++) {
        if (i >= heightStart && i <= heightEnd) {
          row.push(j === positionX ? this._view : EMPTY);
        } else {
          row.push(EMPTY);
        }
      }

      positionX = getRandomIntInclusive(this._mapObj.normalizeByX(positionX - 1), this._mapObj.normalizeByX(positionX + 1));

      map.push(row);
    }

    this._layer = map;
  }
}
