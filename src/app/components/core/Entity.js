import ChuSprite from './ChuSprite';
import Vec2 from './Vec2';
import TileCollider from '../collision/TileCollider';

export default class Entity extends ChuSprite {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
    this.vel = opts.vel ? new Vec2(opts.vel.x, opts.vel.y) : new Vec2(0, 0);
    this.tileCollider = new TileCollider(this);
    this.hasMass = true;
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
  addTrait(TraitType) {
    const trait = new TraitType(this);
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
      this.render(this.textures[this.opts.init.tile], {
        x: this.opts.init.x,
        y: this.opts.init.y,
      });
      this.anchor.x = 0.5;

      resolve();
    });
  }

  /**
   * Calls when entities collides
   *
   * @memberof Entity
   */
  collides(candidate) {
    this.traits.forEach((trait) => {
      trait.collides(candidate);
    });
  }

  /**
   * Calls when eentity obstruct with a side
   *
   * @memberof Entity
   */
  obstruct(side, match) {
    this.traits.forEach((trait) => {
      trait.obstruct(side, match);
    });
  }

  /**
   * Update the entity each frame
   *
   * @param {any} delta
   * @memberof Entity
   */
  update(delta) {
    this.redraw();
    this.traits.forEach((trait) => {
      trait.update(delta);
    });
  }

  /**
   * Finalise state for each trait
   *
   * @memberof Entity
   */
  finalize() {
    this.traits.forEach((trait) => {
      trait.finalize();
    });
  }

  /* eslint-disable class-methods-use-this */
  /**
   * Flush entity after being killed
   *
   * @returns
   * @memberof Entity
   */
  die() {
    this.game.compositor.delete(this);
  }
  /* eslint-disable class-methods-use-this */

  static factory(game) {
    const entity = new this(game);
    if (entity.init) entity.init();
    return entity;
  }
}
