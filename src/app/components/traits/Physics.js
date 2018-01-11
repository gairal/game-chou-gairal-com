import Game from '../../ChuGame';
import Trait from './Trait';

export default class Physics extends Trait {
  constructor(entity) {
    super(entity, 'physics');
  }

  update(delta) {
    this.entity.x += this.entity.vel.x * delta;
    this.entity.tileCollider.checkX();

    this.entity.y += this.entity.vel.y * delta;
    this.entity.tileCollider.checkY();

    if (Game.constants.hasGravity) {
      this.entity.vel.y += Game.constants.gravity * delta;
    }
  }
}
