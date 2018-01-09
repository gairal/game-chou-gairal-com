import { Sprite } from 'pixi.js';

export default class Chubject {
  constructor(game, opts) {
    this.game = game;
    this.opts = opts;
  }

  get app() {
    return this.game.app;
  }

  get stage() {
    return this.app.stage;
  }

  get unit() {
    return this.game.opts.unit;
  }

  get scale() {
    return this.game.opts.scale;
  }

  get tileset() {
    return this.opts.tileset;
  }

  render(texture, coords) {
    const sprite = new Sprite(texture);
    sprite.x = coords.x * this.unit * this.scale;
    sprite.y = coords.y * this.unit * this.scale;
    sprite.scale.set(this.scale);

    this.stage.addChild(sprite);
  }
}
