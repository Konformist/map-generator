import LayersFactory from './LayersFactory.js';
import { configMapDefault } from './utils/utils.js';

const config = configMapDefault();
const mapWidth = document.querySelector('#mapWidth');
const mapHeight = document.querySelector('#mapHeight');

config.mapWidth = 60;
config.mapHeight = 60;

mapWidth.value = config.mapWidth;
mapHeight.value = config.mapHeight;

const init = async () => {
  config.mapWidth = mapWidth.value;
  config.mapHeight = mapHeight.value;
  config.views.soil = '<div class="point soil"></div>';
  config.views.water = '<div class="point water"></div>';
  config.views.wood = '<div class="point wood"></div>';
  config.views.stone = '<div class="point stone"></div>';

  const mapGen = LayersFactory.createMap(config);

  let str = '';

  mapGen.forEach((e) => {
    str += `<div class="row">${e.join('')}</div>`;
  });

  const container = document.querySelector('#map');

  container.innerHTML = str;
}

window.init = init;

init();
