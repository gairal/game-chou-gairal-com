import { Sprite } from 'pixi.js';
import Game from '../../ChuGame';

export default class Chubject {
  constructor(game, opts) {
    this.game = game;
    this.opts = opts;
    this.sprite = null;
  }

  get app() {
    return this.game.app;
  }

  get stage() {
    return this.app.stage;
  }

  get tileset() {
    return this.opts.tileset;
  }

  render(texture, coords) {
    this.sprite = new Sprite(texture);
    this.sprite.x = coords.x * Game.constants.scale * Game.constants.unit;
    this.sprite.y = coords.y * Game.constants.scale * Game.constants.unit;
    this.sprite.scale.set(Game.constants.scale);

    this.stage.addChild(this.sprite);
  }
}
