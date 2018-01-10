import Game from '../../ChuGame';
import Trait from './Trait';

export default class Physics extends Trait {
  constructor(entity) {
    super(entity, 'physics');
  }

  update(delta) {
    this.entity.pos.x += this.entity.vel.x * delta;
    this.entity.pos.y += this.entity.vel.y * delta;

    if (Game.constants.hasGravity) {
      this.entity.vel.y += Game.constants.gravity * delta;
    }
  }
}
