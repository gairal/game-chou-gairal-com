import Trait from './Trait';

export default class Jump extends Trait {
  constructor(entity) {
    super(entity, 'jump');

    this.ready = 1;
    this.duration = 0.3;
    this.engageTime = 0;
    this.requestTime = 0;
    this.gracePeriod = 0.1;
    this.speedBoost = 0.3;
    this.velocity = 15;
  }

  get falling() {
    return this.ready < 0;
  }

  start() {
    // this.requestTime = this.gracePeriod;
    this.engageTime = this.duration;
  }

  cancel() {
    this.engageTime = 0;
    this.requestTime = 0;
  }

  // obstruct(entity, side) {
  //   if (side === Sides.BOTTOM) {
  //     this.ready = 1;
  //   } else if (side === Sides.TOP) {
  //     this.cancel();
  //   }
  // }

  update(delta) {
    // if (this.requestTime > 0) {
    //   if (this.ready > 0) {
    //     this.engageTime = this.duration;
    //     this.requestTime = 0;
    //   }

    //   this.requestTime -= delta;
    // }

    if (this.engageTime > 0) {
      // this.entity.pos.y = -(this.velocity + (Math.abs(this.entity.pos.x) * this.speedBoost));
      this.entity.vel.y -= this.velocity;
      this.engageTime -= delta;
    }

    // this.ready -= 1;
  }
}
