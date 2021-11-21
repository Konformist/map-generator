export default class MapObject {
  constructor(config) {
    this._width = config.width;
    this._height = config.height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get maxX() {
    return this._width - 1;
  }

  get minX() {
    return 0;
  }

  get maxY() {
    return this._height - 1;
  }

  get minY() {
    return 0;
  }

  normalizeByX(value) {
    if (value < this.minX) {
      return this.minX;
    } else if (value > this.maxX) {
      return this.maxX;
    } else {
      return value;
    }
  }

  normalizeByY(value) {
    if (value < this.minY) {
      return this.minY;
    } else if (value > this.maxY) {
      return this.maxY;
    } else {
      return value;
    }
  }
}
