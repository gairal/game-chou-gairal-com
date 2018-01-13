import Trait from './Trait';
import Sides from '../core/Sides';

export default class Jump extends Trait {
  constructor(entity) {
    super(entity, 'jump');

    this.ready = true;
    this.duration = 0.3;
    this.engageTime = 0;
    this.speedBoost = 0.3;
    this.velocity = 15;
  }

  get falling() {
    return this.ready;
  }

  start() {
    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
  }

  obstruct(side) {
    if (side === Sides.BOTTOM) {
      this.ready = true;
    } else if (side === Sides.TOP) {
      this.cancel();
    }
  }

  update(delta) {
    if (this.ready) {
      if (this.engageTime > 0) {
        this.entity.vel.y -= this.velocity;
        this.engageTime -= delta;
      }
    }

    this.ready = false;
  }
}
