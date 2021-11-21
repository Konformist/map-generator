import Forest from './layers/Forest.js';
import River from './layers/River.js';
import Rock from './layers/Rock.js';
import Soil from './layers/Soil.js';
import MapObject from './MapObject.js';
import { getRandomIntInclusive } from './utils/utils.js';
import { EMPTY, SIZES } from './variables.js';

/**
 *
 * @param {Layer} baseLayer
 * @param {Layer} newLayer
 */
function merge(baseLayer, newLayer) {
  baseLayer.layer.forEach((row, indexRow) => {
    newLayer.layer[indexRow].forEach((view, indexView) => {
      if (view !== EMPTY) {
        row.splice(indexView, 1, view);
      }
    });
  });
}

export default class LayersFactory {
  /**
   * @param {Object} config
   * @param {number} config.mapWidth
   * @param {number} config.mapHeight
   * @param {string} config.countSoil
   * @param {string} config.sizeSoil
   * @param {string} config.countForest
   * @param {string} config.sizeForest
   * @param {string} config.countRivers
   * @param {string} config.sizeRivers
   * @param {string} config.countRocks
   * @param {string} config.sizeRocks
   * @param {Object} config.views
   * @param {string} config.views.water
   * @param {string} config.views.soil
   * @param {string} config.views.wood
   * @param {string} config.views.stone
   */
  static createMap(config) {
    const mapObj = new MapObject({ width: config.mapWidth, height: config.mapHeight });
    const baseLayer = LayersFactory.createBaseLayer(Soil, { mapObj, view: config.views.soil });
    const rivers = LayersFactory.createLayers(River, {
      mapObj,
      size: config.sizeRivers,
      count: config.countRivers,
      view: config.views.water,
    });
    const forests = LayersFactory.createLayers(Forest, {
      mapObj,
      size: config.sizeForest,
      count: config.countForest,
      view: config.views.wood,
    });
    const rocks = LayersFactory.createLayers(Rock, {
      mapObj,
      size: config.sizeRocks,
      count: config.countRocks,
      view: config.views.stone,
    });

    LayersFactory.mergeLayers(baseLayer, [
      ...rivers,
      ...forests,
      ...rocks,
    ]);

    return baseLayer.layer;
  }

  /**
   * @param {Layer} layer
   * @param {Object} config
   * @param {string} config.view
   * @param {MapObject} config.mapObj
   */
  static createBaseLayer(layer, config) {
    return new layer(config.mapObj, { view: config.view });
  }

  /**
   * @param {Layer} layer
   * @param {Object} config
   * @param {string} config.count
   * @param {string} config.size
   * @param {string} config.view
   * @param {MapObject} config.mapObj
   */
  static createLayers(layer, config) {
    const layers = [];
    const countType = SIZES[config.count];
    const sizeType = SIZES[config.size];
    const mapObj = config.mapObj;

    let count = 0;

    switch (countType) {
      case SIZES.small: count = getRandomIntInclusive(0, 3); break;
      case SIZES.middle: count = getRandomIntInclusive(3, 6); break;
      case SIZES.large: count = getRandomIntInclusive(6, 9); break;
    }

    for (let i = 0; i <= count; i++) {
      layers.push(new layer(mapObj, { view: config.view, size: sizeType }));
    }

    return layers;
  }

  /**
   * @param {Layer} baseLayer
   * @param {Layer[]} layers
   */
  static mergeLayers(baseLayer, layers) {
    const mapPriority = layers.reduce((acc, layer) => {
      if (acc[layer.priority]) {
        acc[layer.priority].push(layer);
      } else {
        acc[layer.priority] = [layer];
      }
      return acc;
    }, {});
    const arrPriority = Object.keys(mapPriority).sort((a, b) => a - b);

    merge(baseLayer, baseLayer);

    arrPriority.forEach((key) => {
      mapPriority[key].forEach((layer) => {
        merge(baseLayer, layer);
      })
    })
  }
}
