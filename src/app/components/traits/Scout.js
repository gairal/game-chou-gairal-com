import Trait from './Trait';
import Sides from '../core/Sides';

export default class Scout extends Trait {
  constructor(entity) {
    super(entity, 'Scout');

    this.speed = 2;
  }

  obstruct(side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) this.speed *= -1;
  }

  update() {
    // console.log('test');
    this.entity.vel.x = this.speed;
  }
}
