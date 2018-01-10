import Chubject from './Chubject';
import Vec2 from './Vec2';
import TileCollider from '../collision/TileCollider';

export default class Entity extends Chubject {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
    this.vel = new Vec2(opts.vel.x, opts.vel.y);
    this.size = new Vec2(opts.size.x, opts.size.y);
    this.tileCollider = new TileCollider(this);
  }

  get pos() {
    return this.sprite;
  }

  setPos(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  logPos() {
    this.game.logger.info(this.tileset.name, `| x: ${this.pos.x} - y: ${this.pos.y}`);
  }

  draw(res) {
    return new Promise((resolve) => {
      this.textures = res[this.tileset.name].textures;
      this.render(this.textures[this.opts.pos.tile], {
        x: this.opts.pos.x,
        y: this.opts.pos.y,
      });

      this.logPos();

      resolve();
    });
  }

  addTrait(trait) {
    this.traits.push(trait);
    this[trait.NAME] = trait;
  }

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
