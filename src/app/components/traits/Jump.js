import Trait from './Trait';
import Sides from '../core/Sides';

export default class Jump extends Trait {
  constructor(entity) {
    super(entity, 'jump');

    this.ready = true;
    this.duration = 0.4;
    this.engageTime = 0;
    this.speedBoost = 0.3;
    this.velocity = 15;

    this.requestTime = 0;
    this.gracePeriod = 5;
    this.speedBoost = 0.3;
  }

  get falling() {
    return this.ready;
  }

  start() {
    this.requestTime = this.gracePeriod;
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
    if (this.requestTime > 0) {
      if (this.ready) {
        this.engageTime = this.duration;
        this.requestTime = 0;
      }

      this.requestTime -= delta;
    }

    if (this.engageTime > 0) {
      this.entity.vel.y -= this.velocity + (Math.abs(this.entity.vel.x) * this.speedBoost);
      this.engageTime -= delta;
    }

    this.ready = false;
  }
}
