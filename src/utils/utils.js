import { SOIL, STONE, WATER, WOOD } from '../variables.js';

export const configMapDefault = () => ({
  mapWidth: 30,
  mapHeight: 12,
  countSoil: 'small',
  sizeSoil: 'middle',
  countForest: 'small',
  sizeForest: 'middle',
  countRivers: 'small',
  sizeRivers: 'middle',
  countRocks: 'small',
  sizeRocks: 'middle',
  views: {
    soil: SOIL,
    water: WATER,
    wood: WOOD,
    stone: STONE,
  },
});

export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}
