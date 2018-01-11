import { Sprite } from 'pixi.js';
import Game from '../../ChuGame';

export default class ChuSprite extends Sprite {
  constructor(game, opts) {
    super();

    this.game = game;
    this.opts = opts;
  }

  get app() {
    return this.game.app;
  }

  get bottom() {
    return this.y + this.height + this.offset.y;
  }

  get top() {
    return this.y + this.offset.y;
  }

  get left() {
    return this.x + this.offset.x;
  }

  get right() {
    return this.x + this.width + this.offset.x;
  }

  /**
   * Set Sprite position
   *
   * @param {any} x
   * @param {any} y
   * @memberof ChuSprite
   */
  set(x, y) {
    this.x = x;
    this.y = y;
  }

  /**
   * Log current position (used for debug only)
   *
   * @memberof Entity
   */
  logPos() {
    this.game.logger.info(this.tileset.name, `| x: ${this.x} - y: ${this.y}`);
  }

  /**
   * use forward sprite
   *
   * @memberof Entity
   */
  orient(dir) {
    if (!dir) return;
    // this.scale.x = dir * Game.constants.scale;
  }

  /**
   * Change the sprite texture
   *
   * @memberof Entity
   */
  redraw() {
    const frameName = this.routeFrame();
    this.texture = this.textures[frameName];
  }

  /**
   * Stage itself
   *
   * @param {any} texture
   * @param {any} coords
   * @memberof ChuSprite
   */
  render(texture, coords) {
    this.texture = texture;
    this.x = coords.x * Game.constants.scale * Game.constants.unit;
    this.y = coords.y * Game.constants.scale * Game.constants.unit;
    this.scale.set(Game.constants.scale);

    this.app.stage.addChild(this);
  }
}
