import * as process from 'process';
import * as readline from 'readline';
import LayersFactory from './LayersFactory.js';
import { configMapDefault } from './utils/utils.js';
import { COLOURS } from './variables.js';

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

/**
 * @param {string} text
 * @returns {Promise<string>}
 */
const prompt = (text) => (
  new Promise((resolve) => {
    cli.question(text, (answer) => {
      resolve(answer);
    });
  })
);

const init = async () => {
  let isExit = false;

  while (!isExit) {
    const config = configMapDefault();

    config.mapWidth = parseInt(await prompt('Map width: '), 10);
    config.mapHeight = parseInt(await prompt('Map height: '), 10);
    config.views.soil = `${COLOURS.fg.cyan}.${COLOURS.reset}`;
    config.views.water = `${COLOURS.bg.blue}${COLOURS.fg.black}~${COLOURS.reset}`;
    config.views.wood = `${COLOURS.bg.green}${COLOURS.fg.black}^${COLOURS.reset}`;
    config.views.stone = `${COLOURS.bg.white}${COLOURS.fg.black}*${COLOURS.reset}`;

    const mapGen = LayersFactory.createMap(config);

    mapGen.forEach((e) => {
      console.log(e.join(''));
    });

    const answer = await prompt('Exit (y/n)?: ');

    isExit = answer === 'y';
  }

  cli.close();
}

init();
