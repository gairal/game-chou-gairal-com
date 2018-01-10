import Trait from './Trait';

export default class Physics extends Trait {
  constructor(entity) {
    super(entity, 'physics');
  }

  update(delta) {
    this.entity.pos.x += this.entity.vel.x * delta;
    this.entity.pos.y += this.entity.vel.y * delta;

    if (this.entity.game.opts.hasGravity) {
      this.entity.vel.y += this.entity.game.opts.gravity * delta;
    }
  }
}
