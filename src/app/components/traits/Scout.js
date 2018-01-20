import Trait from './Trait';
import Sides from '../core/Sides';

export default class Scout extends Trait {
  constructor(entity) {
    super(entity, 'scout');
    this.enable();
  }

  enable() {
    this.speed = 2;
  }

  stop() {
    this.speed = 0;
  }

  bounce() {
    this.speed *= -1;
    this.entity.orient(Math.sign(this.speed));
  }

  obstruct(side) {
    if (side === Sides.LEFT || side === Sides.RIGHT) this.bounce();
  }

  update() {
    this.entity.vel.x = this.speed;
  }
}
