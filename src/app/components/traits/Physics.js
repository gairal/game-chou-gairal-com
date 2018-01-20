import Game from '../../ChuGame';
import Trait from './Trait';

export default class Physics extends Trait {
  constructor(entity) {
    super(entity, 'physics');
  }

  update(delta) {
    if (Game.constants.hasGravity && this.entity.hasMass) {
      this.entity.vel.y += Game.constants.gravity * delta;
    }
  }
}
