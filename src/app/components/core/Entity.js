import Chubject from './Chubject';
import Game from '../../ChuGame';
import Vec2 from './Vec2';
import Animation from './Animation';
import TileCollider from '../collision/TileCollider';
import BoundingBox from '../collision/BoundingBox';

export default class Entity extends Chubject {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
    this.animations = [];
    this.vel = new Vec2(opts.vel.x, opts.vel.y);
    this.size = new Vec2(opts.size.x, opts.size.y);
    this.offset = new Vec2(0, 0);
    this.tileCollider = new TileCollider(this);
    this.bounds = new BoundingBox(this);
  }

  get pos() {
    return this.sprite || new Vec2(this.opts.pos.x, this.opts.pos.y);
  }

  setPos(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  /**
   * Add animation on the entity
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
   * Add new trait to the entity
   *
   * @param {any} trait
   * @memberof Entity
   */
  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

  /**
   * Log current position (used for debug only)
   *
   * @memberof Entity
   */
  logPos() {
    this.game.logger.info(this.tileset.name, `| x: ${this.pos.x} - y: ${this.pos.y}`);
  }

  /**
   * Change the sprite texture
   *
   * @memberof Entity
   */
  redraw() {
    const frameName = this.routeFrame();
    this.sprite.texture = this.textures[frameName];
  }

  /**
   * use forward sprite
   *
   * @memberof Entity
   */
  orient(dir) {
    if (!dir) return;
    this.sprite.scale.x = dir * Game.constants.scale;
  }
  /**
   * First draw, creation of the sprite object
   *
   * @param {any} Pixy.loader.Resources
   * @returns
   * @memberof Entity
   */
  draw(res) {
    return new Promise((resolve) => {
      this.textures = res[this.tileset.name].textures;
      this.render(this.textures[this.opts.pos.tile], {
        x: this.opts.pos.x,
        y: this.opts.pos.y,
      });
      this.sprite.anchor.x = 0.5;

      resolve();
    });
  }

  /**
   * Update the entity each frame
   *
   * @param {any} delta
   * @memberof Entity
   */
  update(delta) {
    this.traits.forEach((trait) => {
      trait.update(delta);
    });
  }

  static factory(game) {
    const entity = new this(game);
    if (entity.init) entity.init();
    return entity;
  }
}
