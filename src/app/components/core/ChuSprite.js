import { Sprite, Rectangle, Graphics } from 'pixi.js';
import Game from '../../ChuGame';
import Animation from './Animation';

export default class ChuSprite extends Sprite {
  constructor(game, opts) {
    super();

    this.game = game;
    this.opts = opts;
    this.animations = [];

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

  get tilesetName() {
    return this.opts.tilesetName || this.opts.name;
  }

  get textures() {
    return this.game.resources[this.tilesetName].textures;
  }

  get indexX() {
    return Math.floor(this.x / (Game.constants.unit * Game.constants.scale));
  }

  get indexY() {
    return Math.floor(this.y / (Game.constants.unit * Game.constants.scale));
  }

  set indexX(x) {
    this.x = x * Game.constants.unit * Game.constants.scale;
  }

  set indexY(y) {
    this.y = y * Game.constants.unit * Game.constants.scale;
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
   * Set Sprite position
   *
   * @param {any} x
   * @param {any} y
   * @memberof ChuSprite
   */
  setIndex(x, y) {
    this.indexX = x;
    this.indexY = y;
  }

  /**
   * Log current position (used for debug only)
   *
   * @memberof Entity
   */
  logPos() {
    this.game.logger.info(this.name, `| x: ${this.x} - y: ${this.y}`);
  }

  /**
   * Add animation on the sprite
   *
   * @param {any} name
   * @param {any} frames
   * @param {any} frameLen
   * @returns
   * @memberof Entity
   */
  addAnim(name, frames, frameLen) {
    const anim = new Animation(name, frames, frameLen);
    this.animations.push(anim);
    this[name] = anim;
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
  redraw(delta) {
    const frameName = this.routeFrame(delta);
    this.texture = this.textures[frameName];
  }

  /**
   * Default
   *
   * @returns
   * @memberof ChuSprite
   */
  routeFrame(delta) {
    return this.defaultAnim.resolveFrame(delta);
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

    if (!coords) {
      this.x = 0;
      this.y = 0;
    } else {
      this.indexX = coords.x ? coords.x : 0;
      this.indexY = coords.y ? coords.y : 0;
    }

    this.scale.set(Game.constants.scale);
    this.app.stage.addChild(this);
  }
}
