import { Sprite, Rectangle, Graphics } from 'pixi.js';
import Game from '../../ChuGame';

export default class ChuSprite extends Sprite {
  constructor(game, opts) {
    super();

    this.game = game;
    this.opts = opts;

    if (opts && opts.hitbox) {
      this.hitArea = new Rectangle(
        this.x, this.y,
        opts.hitbox.width * Game.constants.scale,
        opts.hitbox.height * Game.constants.scale,
      );
    }
  }

  get app() {
    return this.game.app;
  }

  get bottom() {
    return this.hitArea.y + this.hitArea.height;
  }

  get top() {
    return this.hitArea.y;
  }

  get left() {
    return this.hitArea.x;
  }

  get right() {
    return this.hitArea.x + this.hitArea.width;
  }

  get offsetX() {
    return this.width * this.anchor.x;
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
   * Update coordinates of hit area
   *
   * @memberof ChuSprite
   */
  updateHitArea() {
    this.hitArea.x = this.x - this.offsetX;
    this.hitArea.y = this.y;
  }

  /**
   * Display Hit area
   *
   * @memberof ChuSprite
   */
  showHit() {
    if (Game.constants.DEBUG) {
      if (!this.hitbox) {
        this.hitbox = new Graphics();
        this.hitbox.lineStyle(4, 0xFF3300, 1);
        this.hitbox.drawRect(0, 0, this.hitArea.width, this.hitArea.height);
        this.app.stage.addChild(this.hitbox);
      }

      this.hitbox.x = this.hitArea.x;
      this.hitbox.y = this.hitArea.y;
    }
  }

  /**
   * use forward sprite
   *
   * @memberof Entity
   */
  orient(dir) {
    if (!dir) return;
    this.scale.x = dir * Game.constants.scale;
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
