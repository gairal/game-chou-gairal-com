import ChuSprite from './ChuSprite';
import Vec2 from './Vec2';
import TileCollider from '../collision/TileCollider';

export default class Entity extends ChuSprite {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
    this.vel = opts.vel ? new Vec2(opts.vel.x, opts.vel.y) : new Vec2(0, 0);
    this.tileCollider = new TileCollider(this);
  }

  get name() {
    return this.opts.name;
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
   * First draw, creation of the sprite object
   *
   * @param {any} Pixy.loader.Resources
   * @returns
   * @memberof Entity
   */
  draw() {
    return new Promise((resolve) => {
      this.render(this.textures[this.opts.pos.tile], {
        x: this.opts.pos.x,
        y: this.opts.pos.y,
      });
      this.anchor.x = 0.5;

      resolve();
    });
  }

  obstruct(side) {
    this.traits.forEach((trait) => {
      trait.obstruct(side);
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
