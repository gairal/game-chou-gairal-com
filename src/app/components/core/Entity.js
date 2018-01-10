import Chubject from './Chubject';
import Vec2 from './Vec2';

export default class Entity extends Chubject {
  constructor(game, opts) {
    super(game, opts);

    this.traits = [];
    this.vel = new Vec2(opts.vel.x, opts.vel.y);
  }

  get pos() {
    return this.sprite;
  }

  setPos(x, y) {
    this.sprite.x = x;
    this.sprite.y = y;
  }

  draw(res) {
    this.textures = res[this.tileset.name].textures;
    this.render(this.textures[this.opts.pos.tile], {
      x: this.opts.pos.x,
      y: this.opts.pos.y,
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
