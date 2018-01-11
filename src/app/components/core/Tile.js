import ChuSprite from './ChuSprite';

export default class Tile extends ChuSprite {
  constructor(game) {
    super(game, { tilesetName: 'level' });
  }
}
