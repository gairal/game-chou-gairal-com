import { Sprite } from 'pixi.js';

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

  get unit() {
    return this.game.opts.unit;
  }

  get scale() {
    return this.game.opts.scale;
  }

  get scaledUnit() {
    return this.scale * this.unit;
  }

  get tileset() {
    return this.opts.tileset;
  }

  render(texture, coords) {
    this.sprite = new Sprite(texture);
    this.sprite.x = coords.x * this.scaledUnit;
    this.sprite.y = coords.y * this.scaledUnit;
    this.sprite.scale.set(this.scale);

    this.stage.addChild(this.sprite);
  }
}
