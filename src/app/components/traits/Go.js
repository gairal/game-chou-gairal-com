import Trait from './Trait';

export default class Go extends Trait {
  constructor(entity) {
    super(entity, 'go');

    this.DIRS = {
      idle: 0,
      forward: 1,
      backward: -1,
    };

    this.dir = this.DIRS.idle;
    this.speed = 2;
    this.acceleration = 400;
    this.deceleration = 300;
    this.dragFactor = 1 / 5000;

    this.distance = 0;
    this.heading = 1;
  }

  forward() {
    this.dir = this.DIRS.forward;
  }

  backward() {
    this.dir = this.DIRS.backward;
  }

  stop() {
    this.dir = this.DIRS.idle;
    this.entity.vel.x = 0;
  }

  update(delta) {
    if (this.dir !== this.DIRS.idle) {
      this.entity.vel.x += this.dir * this.speed * delta;
      this.entity.logPos();
    }

    // const absX = Math.abs(this.entity.vel.x);

    // if (this.dir !== 0) {
    //   this.entity.vel.x += this.acceleration * delta * this.dir;

    //   if (this.entity.jump) {
    //     if (this.entity.jump.falling === false) {
    //       this.heading = this.dir;
    //     }
    //   } else {
    //     this.heading = this.dir;
    //   }
    // } else if (this.entity.vel.x !== 0) {
    //   const decel = Math.min(absX, this.deceleration * delta);
    //   this.entity.vel.x += this.entity.vel.x > 0 ? -decel : decel;
    // } else {
    //   this.distance = 0;
    // }

    // const drag = this.dragFactor * this.entity.vel.x * absX;
    // this.entity.vel.x -= drag;

    // this.distance += absX * delta;
  }
}